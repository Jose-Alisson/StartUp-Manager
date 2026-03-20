import { useEffect, useState, useCallback, useRef } from "react";
 
/**
 * ScrollStepper — Vertical Dinâmico
 *
 * Cada círculo é posicionado EXATAMENTE no centro vertical da seção correspondente.
 * A linha entre dois círculos conecta seus centros, independente do tamanho de cada seção.
 *
 * ─── Como funciona ─────────────────────────────────────────────────────────
 *  1. Mede o centro absoluto (pageY) de cada seção ref
 *  2. Calcula o offset de cada círculo relativo ao centro da 1ª seção
 *  3. Posiciona tudo com position: absolute dentro de um container
 *     cuja height = distância do centro da 1ª à última seção
 *  4. ResizeObserver remede quando o layout mudar
 *  5. Scroll listener atualiza o step ativo
 *
 * ─── Uso ───────────────────────────────────────────────────────────────────
 *
 *   // Sidebar sticky + conteúdo lado a lado
 *   function Page() {
 *     const refs = {
 *       foto:         useRef(null),
 *       basico:       useRef(null),
 *       legislacao:   useRef(null),
 *       investimento: useRef(null),
 *       dicas:        useRef(null),
 *       checklist:    useRef(null),
 *     }
 *
 *     const steps = [
 *       { label: "Foto",         ref: refs.foto         },
 *       { label: "Básico",       ref: refs.basico       },
 *       { label: "Legislação",   ref: refs.legislacao   },
 *       { label: "Investimento", ref: refs.investimento },
 *       { label: "Dicas",        ref: refs.dicas        },
 *       { label: "Checklist",    ref: refs.checklist    },
 *     ]
 *
 *     return (
 *       <div style={{ display: "flex", gap: 32 }}>
 *
 *         // Sidebar: sticky para o stepper sempre aparecer
 *         <aside style={{ position: "sticky", top: 80, height: "fit-content", width: 140 }}>
 *           <ScrollStepper steps={steps} scrollOffset={160} />
 *         </aside>
 *
 *         // Conteúdo com as seções
 *         <main style={{ flex: 1 }}>
 *           <section ref={refs.foto}>...</section>
 *           <section ref={refs.basico}>...</section>
 *           ...
 *         </main>
 *
 *       </div>
 *     )
 *   }
 *
 * ─── Props ─────────────────────────────────────────────────────────────────
 *   steps        → { label: string, ref: RefObject<HTMLElement> }[]
 *   scrollOffset → px do topo da viewport para considerar seção ativa (default 160)
 *   circleSize   → diâmetro do círculo em px (default 32)
 */
 
export function ScrollStepper({
  steps,
  scrollOffset = 160,
  circleSize   = 32,
}) {
  const [active,   setActive]   = useState(0);
  const [offsets,  setOffsets]  = useState([]); // top de cada círculo dentro do container
  const [totalH,   setTotalH]   = useState(0);  // height do container
  const sidebarRef = useRef(null);
 
  // ── Medir posições absolutas dos centros das seções ─────────────────────
  const measure = useCallback(() => {
    const valid = steps.every((s) => s.ref?.current);
    if (!valid) return;
 
    // Centro absoluto (pageY) de cada seção
    const centers = steps.map((s) => {
      const rect = s.ref.current.getBoundingClientRect();
      return rect.top + window.scrollY + rect.height / 2;
    });
 
    const origin = centers[0];
 
    // Offset de cada círculo dentro do container = centro - origin
    setOffsets(centers.map((c) => c - origin));
 
    // Altura do container = distância do 1º ao último centro
    setTotalH(centers[centers.length - 1] - origin);
  }, [steps]);
 
  // Medir na montagem e quando o layout mudar
  useEffect(() => {
    // Primeira medição após o browser pintar
    const frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [measure]);
 
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    steps.forEach((s) => { if (s.ref?.current) ro.observe(s.ref.current); });
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [steps, measure]);
 
  // ── Scroll: detectar seção ativa ─────────────────────────────────────────
  const detect = useCallback(() => {
    const idx = [...steps].reverse().findIndex((s) => {
      if (!s.ref?.current) return false;
      return s.ref.current.getBoundingClientRect().top <= scrollOffset;
    });
    setActive(idx === -1 ? 0 : steps.length - 1 - idx);
  }, [steps, scrollOffset]);
 
  useEffect(() => {
    window.addEventListener("scroll", detect, { passive: true });
    detect();
    return () => window.removeEventListener("scroll", detect);
  }, [detect]);
 
  // ── Clique: scroll suave ──────────────────────────────────────────────────
  const goTo = (ref) =>
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
 
  const half = circleSize / 2;
 
  if (!offsets.length) return null;
 
  return (
    // Container com altura exata = distância entre centros da 1ª e última seção
    <div
      ref={sidebarRef}
      style={{
        position: "relative",
        width: 120,
        height: totalH + circleSize, // + circleSize para acomodar o último círculo
      }}
    >
      {steps.map((step, i) => {
        const isDone   = i < active;
        const isActive = i === active;
        const isLast   = i === steps.length - 1;
        const top      = offsets[i] ?? 0;
        const nextTop  = offsets[i + 1] ?? 0;
 
        // Altura da linha: distância entre centros dos círculos i e i+1
        // = nextTop - top (distância entre centros das seções)
        const lineH = isLast ? 0 : nextTop - top - circleSize;
 
        return (
          <div
            key={i}
            onClick={() => goTo(step.ref)}
            style={{
              position: "absolute",
              // Centraliza o círculo no centro da seção
              top: top,
              left: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            {/* Coluna: círculo + linha */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
 
              {/* Círculo */}
              <div
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  flexShrink: 0,
                  border: `2px solid ${isDone || isActive ? "#C9521A" : "#D4CEC6"}`,
                  background: isDone ? "#F0DACE" : isActive ? "#C9521A" : "#FDFAF6",
                  color: isDone ? "#C9521A" : isActive ? "#fff" : "#B5AFA8",
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? "0 0 0 4px rgba(201,82,26,0.15)" : "none",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {isDone ? "✓" : i + 1}
              </div>
 
              {/* Linha — começa na borda do círculo acima, termina na borda do círculo abaixo */}
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    height: Math.max(lineH, 0),
                    background: isDone ? "#C9521A" : "#E8E2D8",
                    transition: "background 0.4s ease",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
 
            {/* Label — centralizado com o círculo */}
            <span
              style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isDone ? "#C9521A" : isActive ? "#1A1916" : "#B5AFA8",
                transition: "color 0.25s",
                fontFamily: "inherit",
                lineHeight: 1,
                whiteSpace: "nowrap",
                marginTop: 0,
              }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
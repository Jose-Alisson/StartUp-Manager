import React, { createContext, useContext } from "react";


function formatarBR(numStr: string) {
    if (!numStr) return;

    let root = numStr.replace(/\D/g, "");

    root = root.replace(/^0+/, "");
    if (root.length < 2) {
        root = root.padStart(2, "0");
    }

    let centavos = root.slice(-2);
    let inteiro = root.slice(0, -2);

    let number = inteiro
        ? inteiro.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        : "0";

    return `R$ ${number},${centavos}`;
}



const MaskContext = createContext<any>(null)

export function MaskProvider({ children }) {
    const masks = {
        money: (v: string) =>
            formatarBR(v)
        ,
        cpf: (v) =>
            v.replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
    };

    return (
        <MaskContext.Provider value={{ masks }}>
            {children}
        </MaskContext.Provider>
    )
}

export function useMask(maskName, customMask) {
    const ctx = React.useContext(MaskContext)
    return {
        apply(value) {
            if (customMask) return customMask(value);
            if (maskName && ctx.masks[maskName]) {
                return ctx.masks[maskName](value);
            }
            return value;
        },
        toRaw(value: string) {
            let number = value.replace(/\D/g, "")
            let inteiro = number.slice(0, -2)
            let centavos = number.slice(-2)
            return `${inteiro}.${centavos}`
        }
    }
}
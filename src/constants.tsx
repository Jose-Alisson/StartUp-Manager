
import { Business, Category } from './types';

export const CATEGORIES: Category[] = [
  'Varejo',
  'Gastronomia',
  'Automotivo',
  'Saúde/Beleza',
  'Serviços Gerais',
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'nano-1',
    name: 'Aulas Particulares Online',
    category: 'Serviços Gerais',
    description: 'Ensino de reforço escolar, idiomas ou música via videochamada. Baixíssimo custo e flexibilidade total.',
    imageUrl: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 20,
      monthlyProfit: 1500,
      roiMonths: 1,
      margin: 0.95,
    },
    checklist: {
      equipment: ['Conexão com Internet', 'Smartphone ou Notebook', 'Conta em plataforma de vídeo (Meet/Zoom)', 'Fones de ouvido'],
      team: ['Apenas você'],
      location: ['Home Office'],
    },
    risks: {
      seasonality: 'Aumento em períodos de provas escolares; queda nas férias.',
      competition: 'Plataformas globais de ensino.',
      entryBarriers: 'Domínio do conteúdo ensinado.',
    },
    bureaucracy: {
      cnae: '8599-6/99 (Outras atividades de ensino não especificadas anteriormente)',
      legalType: 'MEI',
      permits: ['Nenhum específico'],
    },
    expertTips: [
      'A primeira aula experimental gratuita é sua maior ferramenta de venda.',
      'Crie pacotes mensais para garantir recorrência no seu caixa.'
    ],
  },
  {
    id: 'nano-2',
    name: 'Criação de Currículos Profissionais',
    category: 'Serviços Gerais',
    description: 'Serviço de reestruturação de currículos e perfis de LinkedIn para quem busca recolocação no mercado.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 30,
      monthlyProfit: 1100,
      roiMonths: 1,
      margin: 0.98,
    },
    checklist: {
      equipment: ['Ferramenta de Design Gratuita (Canva)', 'Acesso à Internet', 'Templates profissionais'],
      team: ['Apenas você'],
      location: ['Trabalho 100% Remoto'],
    },
    risks: {
      seasonality: 'Aumento no início do ano e períodos de crise econômica.',
      competition: 'Geradores automáticos de currículos online.',
      entryBarriers: 'Conhecimento sobre o que recrutadores buscam.',
    },
    bureaucracy: {
      cnae: '8219-9/99 (Preparação de documentos e serviços especializados de apoio administrativo)',
      legalType: 'MEI',
      permits: ['Nenhum'],
    },
    expertTips: [
      'Foque em resultados e palavras-chave que os algoritmos de RH (ATS) valorizam.',
      'Entregue o arquivo em PDF e Word para que o cliente possa editar depois.'
    ],
  },
  {
    id: 'nano-3',
    name: 'Geladinho Gourmet (Chup-Chup)',
    category: 'Gastronomia',
    description: 'Fabricação e venda de sorvetes no saquinho com sabores diferenciados (Leite Ninho, Nutella, etc).',
    imageUrl: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 80,
      monthlyProfit: 700,
      roiMonths: 1,
      margin: 0.50,
    },
    checklist: {
      equipment: ['Saquinhos reforçados', 'Liquidificador', 'Funil', 'Freezer doméstico'],
      team: ['Apenas você'],
      location: ['Cozinha residencial'],
    },
    risks: {
      seasonality: 'Alta no verão; queda drástica no inverno.',
      competition: 'Produtos industrializados baratos.',
      entryBarriers: 'Baixíssima (fácil de copiar).',
    },
    bureaucracy: {
      cnae: '1053-8/00 (Fabricação de sorvetes e outros gelados comestíveis)',
      legalType: 'MEI',
      permits: ['Alvará Sanitário (aconselhável)'],
    },
    expertTips: [
      'O segredo está na cremosidade: use liga neutra para evitar cristais de gelo.',
      'Adesivos com sua logo no saquinho triplicam o valor percebido do produto.'
    ],
  },
  {
    id: 'micro-1',
    name: 'Dog Walker Profissional',
    category: 'Serviços Gerais',
    description: 'Passeios recreativos e educativos para cães de moradores de condomínios. Foco em saúde animal e gasto de energia.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 150,
      monthlyProfit: 1200,
      roiMonths: 1,
      margin: 0.90,
    },
    checklist: {
      equipment: ['Guias profissionais de 2m', 'Sacos coletores', 'Petiscos para reforço positivo', 'Cinto de utilidades'],
      team: ['Somente o Empreendedor'],
      location: ['Parques e áreas residenciais com alta densidade de pets'],
    },
    risks: {
      seasonality: 'Queda em dias de chuva forte.',
      competition: 'Pessoas sem treinamento cobrando valores muito baixos.',
      entryBarriers: 'Nenhuma física; barreira de confiança dos donos.',
    },
    bureaucracy: {
      cnae: '9609-2/08 (Serviços de higiene e embelezamento de animais domésticos)',
      legalType: 'MEI',
      permits: ['Nenhum específico para início imediato'],
    },
    expertTips: [
      'Faça um curso de comportamento canino para passar segurança aos donos.',
      'Ofereça a primeira semana com 20% de desconto para fechar pacotes mensais.'
    ],
  },
  {
    id: 'micro-2',
    name: 'Brigadeiros Gourmet para Revenda',
    category: 'Gastronomia',
    description: 'Produção artesanal de doces finos para venda direta em escritórios ou sob encomenda para pequenos eventos.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 350,
      monthlyProfit: 950,
      roiMonths: 1,
      margin: 0.60,
    },
    checklist: {
      equipment: ['Panelas de fundo grosso', 'Espátulas de silicone', 'Embalagens personalizadas', 'Forminhas n. 4'],
      team: ['Somente o Empreendedor'],
      location: ['Cozinha domiciliar'],
    },
    risks: {
      seasonality: 'Aumento em datas como Páscoa e Dia dos Namorados.',
      competition: 'Alta oferta de doces caseiros.',
      entryBarriers: 'Baixíssima; foco total na qualidade do chocolate.',
    },
    bureaucracy: {
      cnae: '1091-1/02 (Fabricação de produtos de padaria e confeitaria)',
      legalType: 'MEI',
      permits: ['Alvará Sanitário (após formalização)'],
    },
    expertTips: [
      'Use chocolate belga ou de alta qualidade; o sabor é o seu marketing.',
      'Venda o "kit presente" com 4 unidades para aumentar o ticket médio.'
    ],
  },
  {
    id: 'micro-3',
    name: 'Lavagem Automotiva Ecológica a Domicílio',
    category: 'Automotivo',
    description: 'Serviço de limpeza externa sem uso de água (dry wash), levando todo o material até o cliente.',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 450,
      monthlyProfit: 1800,
      roiMonths: 1,
      margin: 0.80,
    },
    checklist: {
      equipment: ['Produto concentrado para lavagem a seco', '10 panos de microfibra de alta gramatura', 'Pincéis de detalhamento', 'Mochila de transporte'],
      team: ['Somente o Empreendedor'],
      location: ['Atendimento na garagem do cliente ou estacionamentos'],
    },
    risks: {
      seasonality: 'Baixa; carros sujam mais em épocas de chuva.',
      competition: 'Lava-jatos fixos de bairro.',
      entryBarriers: 'Necessidade de técnica para não riscar a pintura.',
    },
    bureaucracy: {
      cnae: '4520-0/05 (Serviços de lavagem e polimento de veículos automotores)',
      legalType: 'MEI',
      permits: ['Nenhum específico para início em domicílio'],
    },
    expertTips: [
      'O "pretinho" nos pneus e a limpeza dos vidros são o que o cliente mais nota.',
      'Foque em fechar planos quinzenais com vizinhos de um mesmo condomínio.'
    ],
  },
  {
    id: '1',
    name: 'Food Truck de Hambúrguer Artesanal',
    category: 'Gastronomia',
    description: 'Um negócio de baixo custo fixo e alta rotatividade, focado em eventos e áreas comerciais.',
    imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 45000,
      monthlyProfit: 8000,
      roiMonths: 10,
      margin: 0.25,
    },
    checklist: {
      equipment: ['Chapa profissional', 'Fritadeira', 'Geladeira industrial', 'Sistema de exaustão'],
      team: ['1 Chapeiro', '1 Atendente', '1 Auxiliar'],
      location: ['Pontos de alta circulação', 'Parques de Food Truck', 'Eventos'],
    },
    risks: {
      seasonality: 'Influenciado pelo clima (chuvas reduzem movimento externo).',
      competition: 'Alta em áreas gastronômicas consolidadas.',
      entryBarriers: 'Alvará sanitário e licença de uso de solo.',
    },
    bureaucracy: {
      cnae: '5612-1/00 (Serviços ambulantes de alimentação)',
      legalType: 'MEI (até limite) ou ME',
      permits: ['Alvará Sanitário', 'Auto de Vistoria do Corpo de Bombeiros (AVCB)'],
    },
    expertTips: [
      'Foques em um cardápio enxuto para reduzir desperdício.',
      'A qualidade da carne é o seu maior diferencial competitivo.'
    ],
  },
  {
    id: '2',
    name: 'Pet Shop Express',
    category: 'Saúde/Beleza',
    description: 'Serviços de banho e tosa focados em agilidade e delivery para moradores de condomínios.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 25000,
      monthlyProfit: 4500,
      roiMonths: 14,
      margin: 0.35,
    },
    checklist: {
      equipment: ['Soprador e secador profissional', 'Banheira de fibra', 'Máquinas de tosa'],
      team: ['1 Tosador experiente', '1 Banhista'],
      location: ['Loja compacta próxima a grandes condomínios'],
    },
    risks: {
      seasonality: 'Aumenta no verão; queda leve no inverno.',
      competition: 'Fidelização é difícil sem atendimento excepcional.',
      entryBarriers: 'Custo de equipamentos específicos.',
    },
    bureaucracy: {
      cnae: '9609-2/08 (Higiene e embelezamento de animais domésticos)',
      legalType: 'MEI',
      permits: ['Registro no Conselho Regional de Medicina Veterinária (CRMV)', 'Alvará Sanitário'],
    },
    expertTips: [
      'O serviço de "Leva e Traz" é o que mais atrai clientes ocupados.',
      'Venda acessórios e rações premium no balcão para aumentar o ticket médio.'
    ],
  },
  {
    id: '3',
    name: 'Loja Virtual de Acessórios Tech',
    category: 'Varejo',
    description: 'Comércio eletrônico de cabos, capas de celular e gadgets com estoque enxuto.',
    imageUrl: 'https://images.unsplash.com/photo-1542491595-62e8cdff2801?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 15000,
      monthlyProfit: 3500,
      roiMonths: 8,
      margin: 0.40,
    },
    checklist: {
      equipment: ['Computador', 'Impressora de etiquetas', 'Estoque inicial de produtos'],
      team: ['Gestor (Dono)', 'Freelancer para tráfego pago'],
      location: ['Home office (estoque pode ser em casa)'],
    },
    risks: {
      seasonality: 'Pico em datas festivas (Black Friday, Natal).',
      competition: 'Guerra de preços em marketplaces.',
      entryBarriers: 'Baixa barreira física, alta barreira de marketing.',
    },
    bureaucracy: {
      cnae: '4751-2/01 (Comércio varejista de equipamentos e suprimentos de informática)',
      legalType: 'MEI',
      permits: ['Inscrição Estadual'],
    },
    expertTips: [
      'Invista em fotos profissionais dos produtos para passar confiança.',
      'A velocidade na postagem é crucial para o algoritmo dos marketplaces.'
    ],
  },
  {
    id: '4',
    name: 'Estética Automotiva a Seco',
    category: 'Automotivo',
    description: 'Serviço de limpeza ecológica de veículos, podendo ser fixo ou delivery.',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 8000,
      monthlyProfit: 2500,
      roiMonths: 6,
      margin: 0.60,
    },
    checklist: {
      equipment: ['Aspirador de pó potente', 'Kits de produtos biodegradáveis', 'Microfibras'],
      team: ['1 ou 2 Operadores'],
      location: ['Estacionamentos de shoppings ou serviço em domicílio'],
    },
    risks: {
      seasonality: 'Queda em dias chuvosos.',
      competition: 'Lava-jatos convencionais de baixo preço.',
      entryBarriers: 'Quase nula (fácil de começar).',
    },
    bureaucracy: {
      cnae: '4520-0/05 (Serviços de lavagem e polimento de veículos automotores)',
      legalType: 'MEI',
      permits: ['Alvará de funcionamento'],
    },
    expertTips: [
      'Ofereça pacotes mensais para frotas de empresas.',
      'A higienização interna é onde está o maior lucro, mais do que a lavagem externa.'
    ],
  },
  {
    id: '5',
    name: 'Consultoria de Marketing para Pequenos Negócios',
    category: 'Serviços Gerais',
    description: 'Ajuda para microempreendedores locais a se posicionarem no Google e Redes Sociais.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 2000,
      monthlyProfit: 5000,
      roiMonths: 2,
      margin: 0.85,
    },
    checklist: {
      equipment: ['Notebook', 'Smartphone com boa câmera', 'Software de gestão'],
      team: ['Especialista (Dono)'],
      location: ['Home office / Coworking'],
    },
    risks: {
      seasonality: 'Nenhuma significativa.',
      competition: 'Agências grandes e outros consultores independentes.',
      entryBarriers: 'Conhecimento técnico e portfólio de resultados.',
    },
    bureaucracy: {
      cnae: '7319-0/04 (Consultoria em publicidade)',
      legalType: 'MEI ou ME',
      permits: ['Prefeitura local (ISS)'],
    },
    expertTips: [
      'Seja o seu próprio "case" de sucesso para provar que funciona.',
      'Foque em nichos específicos (ex: marketing apenas para dentistas).'
    ],
  },
  {
    id: '6',
    name: 'Brechó Curado e Sustentável',
    category: 'Varejo',
    description: 'Venda de roupas de segunda mão com curadoria rigorosa, focada em moda sustentável e peças únicas.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 12000,
      monthlyProfit: 3000,
      roiMonths: 10,
      margin: 0.45,
    },
    checklist: {
      equipment: ['Araras e cabides de qualidade', 'Espelhos de corpo inteiro', 'Passador de roupa a vapor', 'Sistema de PDV'],
      team: ['1 Vendedor/Curador', 'Freelancer para fotos de redes sociais'],
      location: ['Bairros residenciais com perfil jovem/hipster', 'Plataformas online (Enjoei/Instagram)'],
    },
    risks: {
      seasonality: 'Baixa sazonalidade; picos em trocas de estação.',
      competition: 'Crescente com apps de desapego.',
      entryBarriers: 'Dificuldade em encontrar fornecedores de peças "premium".',
    },
    bureaucracy: {
      cnae: '4781-4/00 (Comércio varejista de artigos do vestuário e acessórios)',
      legalType: 'MEI',
      permits: ['Alvará de funcionamento'],
    },
    expertTips: [
      'A curadoria é o seu produto, não a roupa. Escolha peças com história.',
      'Crie um ambiente "instagramável" na loja física para atrair tráfego orgânico.'
    ],
  },
  {
    id: '7',
    name: 'Cafeteria de Especialidade "To-Go"',
    category: 'Gastronomia',
    description: 'Foco em cafés de alta qualidade servidos rapidamente em balcões compactos, ideal para zonas empresariais.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 35000,
      monthlyProfit: 6500,
      roiMonths: 12,
      margin: 0.28,
    },
    checklist: {
      equipment: ['Máquina de espresso profissional', 'Moedor de grãos', 'Máquina de gelo', 'Filtros de água'],
      team: ['2 Baristas qualificados'],
      location: ['Próximo a estações de metrô ou lobbies de prédios comerciais'],
    },
    risks: {
      seasonality: 'Aumento de consumo no inverno; necessidade de opções geladas no verão.',
      competition: 'Grandes redes de cafeteria.',
      entryBarriers: 'Custo elevado de equipamentos profissionais.',
    },
    bureaucracy: {
      cnae: '5611-2/03 (Lanchonetes, casas de chá, de sucos e similares)',
      legalType: 'ME',
      permits: ['Alvará Sanitário', 'AVCB'],
    },
    expertTips: [
      'Grãos com torra fresca e rastreabilidade justificam o preço mais alto.',
      'O tempo de serviço não deve passar de 3 minutos por pedido.'
    ],
  },
  {
    id: '8',
    name: 'Barbearia Clássica Moderna',
    category: 'Saúde/Beleza',
    description: 'Serviço de corte e barba com estética vintage e foco na experiência de lazer masculina.',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 20000,
      monthlyProfit: 4000,
      roiMonths: 14,
      margin: 0.35,
    },
    checklist: {
      equipment: ['Cadeiras de barbeiro hidráulicas', 'Kits de tesouras e máquinas', 'Toalheiro aquecido', 'Frigobar'],
      team: ['2 Barbeiros', '1 Recepcionista (opcional)'],
      location: ['Ruas comerciais de bairro ou galerias'],
    },
    risks: {
      seasonality: 'Baixa; demanda constante por higiene.',
      competition: 'Alta saturação em alguns bairros.',
      entryBarriers: 'Dependência total da habilidade técnica da equipe.',
    },
    bureaucracy: {
      cnae: '9602-5/01 (Cabeleireiros, manicure e pedicure)',
      legalType: 'MEI',
      permits: ['Alvará Sanitário'],
    },
    expertTips: [
      'Oferecer uma bebida de cortesia aumenta drasticamente o valor percebido.',
      'Use agendamento online para evitar filas e otimizar o tempo dos barbeiros.'
    ],
  },
  {
    id: '9',
    name: 'Assistência Técnica de Smartphones',
    category: 'Serviços Gerais',
    description: 'Reparo rápido de telas, baterias e software para os modelos de celulares mais populares.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true,
    financials: {
      investment: 10000,
      monthlyProfit: 4500,
      roiMonths: 6,
      margin: 0.55,
    },
    checklist: {
      equipment: ['Estação de solda', 'Microscópio digital', 'Kits de chaves de precisão', 'Estoque de telas comuns'],
      team: ['1 Técnico especializado'],
      location: ['Quiosques de shopping ou lojas de rua com alto fluxo'],
    },
    risks: {
      seasonality: 'Aumento em períodos de férias e festas.',
      competition: 'Muitas assistências informais.',
      entryBarriers: 'Velocidade de atualização tecnológica dos aparelhos.',
    },
    bureaucracy: {
      cnae: '9511-8/00 (Reparação e manutenção de computadores e de equipamentos periféricos)',
      legalType: 'MEI',
      permits: ['Alvará de funcionamento'],
    },
    expertTips: [
      'Dê garantia real nos reparos para se diferenciar da concorrência informal.',
      'A venda de capas e películas gera um lucro extra com esforço zero.'
    ],
  },
  {
    id: '10',
    name: 'Marmitaria Saudável Congelada',
    category: 'Gastronomia',
    description: 'Produção de refeições balanceadas e ultracongeladas para entrega semanal (modelo de assinatura).',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 7000,
      monthlyProfit: 2800,
      roiMonths: 8,
      margin: 0.30,
    },
    checklist: {
      equipment: ['Freezer vertical', 'Fogão industrial', 'Seladora a vácuo', 'Balança de precisão'],
      team: ['1 Cozinheiro', '1 Auxiliar (part-time)'],
      location: ['Cozinha domiciliar adequada ou Dark Kitchen'],
    },
    risks: {
      seasonality: 'Aumento em janeiro (projetos de saúde); queda em dezembro.',
      competition: 'Alta em aplicativos de delivery.',
      entryBarriers: 'Rigorosa fiscalização sanitária.',
    },
    bureaucracy: {
      cnae: '5620-1/04 (Fornecimento de alimentos preparados preponderantemente para consumo domiciliar)',
      legalType: 'MEI',
      permits: ['Alvará Sanitário', 'Curso de Manipulação de Alimentos'],
    },
    expertTips: [
      'O modelo de assinatura semanal garante previsibilidade de caixa.',
      'Use embalagens que podem ir direto ao micro-ondas sem liberar toxinas.'
    ],
  },
  {
    id: '11',
    name: 'Estúdio de Yoga e Pilates',
    category: 'Saúde/Beleza',
    description: 'Aulas presenciais em pequenos grupos focadas em postura, flexibilidade e redução de estresse.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 30000,
      monthlyProfit: 5500,
      roiMonths: 12,
      margin: 0.60,
    },
    checklist: {
      equipment: ['Tapetes (mats) de alta densidade', 'Blocos e cintos de yoga', 'Reformer de Pilates (opcional)', 'Sistema de som'],
      team: ['2 Instrutores certificados'],
      location: ['Salas em prédios comerciais ou casas reformadas em bairros calmos'],
    },
    risks: {
      seasonality: 'Leve queda em meses de férias escolares.',
      competition: 'Academias grandes que oferecem aulas coletivas.',
      entryBarriers: 'Certificações específicas dos instrutores.',
    },
    bureaucracy: {
      cnae: '8592-9/99 (Ensino de arte e cultura não especificado anteriormente)',
      legalType: 'ME',
      permits: ['Alvará de funcionamento', 'Licença Sanitária'],
    },
    expertTips: [
      'Aulas experimentais gratuitas são a melhor forma de converter alunos.',
      'Crie um ambiente con iluminação dimerizável e aromas para melhorar a experiência.'
    ],
  },
  {
    id: '12',
    name: 'Revenda de Peças Automotivas Online',
    category: 'Automotivo',
    description: 'E-commerce especializado em nichos (ex: carros antigos, off-road ou performance) com vendas via marketplaces.',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    financials: {
      investment: 25000,
      monthlyProfit: 4800,
      roiMonths: 15,
      margin: 0.22,
    },
    checklist: {
      equipment: ['Prateleiras de carga', 'Computador potente', 'Software de ERP para estoque', 'Balança de pacotes'],
      team: ['Gestor de E-commerce', 'Auxiliar de expedição'],
      location: ['Galpão pequeno ou garagem organizada'],
    },
    risks: {
      seasonality: 'Baixa sazonalidade.',
      competition: 'Grandes autopeças físicas.',
      entryBarriers: 'Necessidade de conhecimento técnico profundo sobre compatibilidade de peças.',
    },
    bureaucracy: {
      cnae: '4530-7/03 (Comércio a varejo de peças e acessórios novos para veículos automotores)',
      legalType: 'ME',
      permits: ['Inscrição Estadual'],
    },
    expertTips: [
      'Responder dúvidas técnicas rapidamente no Mercado Livre aumenta sua taxa de conversão em 40%.',
      'Focar em um nicho específico (ex: apenas suspensão) reduz seu custo de estoque.'
    ],
  }
];

export const GLOSSARY: Record<string, string> = {
  'CAPEX': 'Capital Expenditure ou Investimento de Capital. É o valor gasto na compra de bens (máquinas, equipamentos, imóvel) necessários para o início da operação.',
  'Markup': 'É um índice utilizado para formação do preço de venda. Ele é aplicado sobre o custo de produção para garantir que o preço final cubra despesas e gere lucro.',
  'Capital de Giro': 'Dinheiro necessário para manter a empresa funcionando dia após dia (pagar fornecedores, salários e contas antes de receber dos clientes).',
  'ROI': 'Return on Investment (Retorno sobre Investimento). Mede quanto tempo ou quanto lucro você obteve em relação ao valor investido.',
  'CNAE': 'Classificação Nacional de Atividades Econômicas. É o código que identifica que tipo de atividade sua empresa realiza para fins tributários.',
  'MEI': 'Microempreendedor Individual. Categoria jurídica simplificada para quem fatura até R$ 81.000 por ano e trabalha sozinho ou com 1 funcionário.',
  'Margem de Lucro': 'A porcentagem que sobra do faturamento após o pagamento de todos os custos e impostos.',
};

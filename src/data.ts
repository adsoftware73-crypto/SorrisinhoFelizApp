export type SymptomKey = "gengivite" | "halitose" | "carie";

export interface BrushingStep {
  step: string;
  emoji: string;
  description: string;
  detail?: string;
}

export interface Symptom {
  title: string;
  emoji: string;
  description: string;
  color: string;
  brushingGuide: BrushingStep[];
}

export const mascotPhrases: string[] = [
  "Oi! Vamos cuidar do seu sorriso? 😊",
  "Você é incrível! Continue assim! ⭐",
  "Que sorriso brilhante! 🌟",
  "Parabéns, campeão da escovação! 🏆",
];

export const symptoms: Record<SymptomKey, Symptom> = {
  gengivite: {
    title: "Gengiva Vermelha",
    emoji: "🦷",
    description:
      "Se sua gengiva está vermelha e sangra, ela pode estar dodói. Isso se chama gengivite.",
    color: "bg-red-100 border-red-300",
    brushingGuide: [
      {
        step: "Use fio dental primeiro",
        emoji: "🧵",
        description: "Peça ajuda a um adulto para limpar entre os dentinhos",
        detail: "O fio dental remove a sujeira que a escova não consegue tirar!",
      },
      {
        step: "Coloca a escovinha no cantinho",
        emoji: "🪥",
        description: "Metade das cerdas no dente, metade na gengiva",
        detail:
          "Imagina que a escova é um trenzinho encostando na estação da gengiva! 🚂",
      },
      {
        step: "Balança suavinho",
        emoji: "✨",
        description: "Como se estivesse fazendo cócegas na gengiva",
        detail: "Não precisa apertar forte! Só mexe de leve 😊",
      },
      {
        step: "Varre para baixo",
        emoji: "🧹",
        description: "Empurra a escova para varrer a sujeira",
        detail: "Como se estivesse varrendo folhas do chão!",
      },
      {
        step: "Repete em todos os dentes",
        emoji: "🔄",
        description: "De um lado, do outro, por dentro e por fora",
        detail: "Todos os dentinhos merecem carinho!",
      },
      {
        step: "Não esquece da língua!",
        emoji: "😛",
        description: "A língua também precisa de limpeza",
        detail: "Escova suavinho para tirar os germinhos!",
      },
      {
        step: "Bochecha com água",
        emoji: "💧",
        description: "Enxágue bem toda a boca",
        detail: "Leva embora toda a sujeira que soltou!",
      },
    ],
  },
  halitose: {
    title: "Bafinho",
    emoji: "💨",
    description:
      "Quando o hálito não está cheiroso, pode ser por causa de germes na boca.",
    color: "bg-blue-100 border-blue-300",
    brushingGuide: [
      { step: "Use fio dental primeiro", emoji: "🧵", description: "Remove restos de comida escondidos", detail: "É aqui que os germes do mau hálito mais gostam de se esconder!" },
      { step: "Pasta com flúor", emoji: "🦷", description: "Um pouquinho na escova", detail: "O flúor ajuda a matar os germes causadores do mau hálito!" },
      { step: "Escove TODOS os dentes", emoji: "😁", description: "Frente, trás, em cima, embaixo", detail: "Movimentos circulares por pelo menos 2 minutos!" },
      { step: "Língua é MUITO importante!", emoji: "👅", description: "Escove ou use raspador", detail: "A língua acumula muitos germes que causam mau hálito!" },
      { step: "Escove o céu da boca", emoji: "🏠", description: "Parte de cima da boca também!", detail: "Lugar que muita gente esquece, mas é importante!" },
      { step: "Bochecha bem forte", emoji: "💧", description: "Enxágue por 30 segundos", detail: "Leva embora todos os germes soltos!" }
    ],
  },
  carie: {
    title: "Dentinho com Dodói",
    emoji: "🍬",
    description:
      "Quando comemos muito doce e não escovamos bem, pode aparecer um buraquinho no dente.",
    color: "bg-yellow-100 border-yellow-300",
    brushingGuide: [
      { step: "Fio dental é o primeiro!", emoji: "🧵", description: "Tira o açúcar entre os dentes", detail: "O açúcar escondido é o que mais causa cárie!" },
      { step: "Pasta com flúor extra", emoji: "🦷", description: "O flúor é o escudo do dente!", detail: "Protege contra os ácidos que fazem os furinhos!" },
      { step: "Técnica do círculo mágico", emoji: "🔵", description: "Círculos pequenos em cada dente", detail: "Conta até 10 em cada dente para limpar bem!" },
      { step: "Atenção nos molares!", emoji: "🦷", description: "Dentes de trás são os mais atacados", detail: "Eles têm sulcos onde a cárie gosta de se esconder!" },
      { step: "Escove a linha da gengiva", emoji: "📏", description: "Onde o dente encontra a gengiva", detail: "Lugar favorito da placa bacteriana!" },
      { step: "Língua também!", emoji: "👅", description: "Remove bactérias da língua", detail: "Bactérias da língua podem atacar os dentes!" },
      { step: "Enxágue sem pressa", emoji: "💧", description: "Deixa o flúor agir um pouco", detail: "Não enxágue demais para o flúor proteger mais!" }
    ],
  },
};

export const generalBrushingSteps: BrushingStep[] = [
  { step: "Use fio dental", emoji: "🧵", description: "Peça ajuda a um adulto" },
  { step: "Coloque pasta na escova", emoji: "🦷", description: "Só um pouquinho de pasta!" },
  { step: "Escove os dentes da frente", emoji: "😁", description: "Movimentos circulares suaves" },
  { step: "Escove os dentes de trás", emoji: "🦷", description: "Não esqueça dos molares!" },
  { step: "Escove a língua", emoji: "👅", description: "A língua também precisa de limpeza" },
  { step: "Bochecha com água", emoji: "💧", description: "Enxágue bem a boca" }
];
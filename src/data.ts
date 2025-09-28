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
  completionMessage?: string;
}

export interface Story {
  title: string;
  emoji: string;
  body: string;
  moral: string;
}

export interface ChecklistTask {
  key: "brushThreeTimes" | "floss" | "fruits" | "vegetables" | "fewSweets" | "water";
  label: string;
  emoji: string;
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
    description: "Você sabia que sua gengiva pode ficar vermelha e inchada quando não escovamos direitinho os dentes? Isso se chama gengivite! Ela aparece porque os bichinhos da sujeira (bactérias) gostam de morar entre os dentes e na gengiva. Mas calma! A gente consegue vencer a gengivite com escovação correta, fio dental e enxágue da boca. Vamos cuidar juntos do seu sorriso, a gengiva fica feliz, clarinha e sem dodói! Vamos la!!!",
    color: "bg-red-100 border-red-300",
    completionMessage: "Parabéns! Você completou todas as etapas do checklist. Olha só como sua gengiva ficou: feliz, rosinha e sem dodói. Agora os monstrinhos da sujeira foram embora e o seu sorriso brilha de alegria!",
    brushingGuide: [
      {
        step: "Missão Fio Dental",
        emoji: "🧵",
        description: "Os monstrinhos estão escondidos entre os dentinhos! Pegue o fio dental e passe com cuidado entre um dente e outro, como se estivesse puxando as sujeirinhas para fora como o seu dentista ensinou. Assim, eles não conseguem mais se esconder!",
      },
      {
        step: "Escovar os Dentinhos (Técnica dos Fones)",
        emoji: "🪥",
        description: "Agora vamos escovar os dentes! Imagine que sua escova é vassourinha e você vai fazer movimentos de vaivém bem suaves e de bolinha em todos os dentes.",
        detail: "Escove a frente, atrás e também as partes de mastigar. Quanto mais capricho, mais brilhante o sorriso fica.",
      },
      {
        step: "Escovando da Línguinha",
        emoji: "😛",
        description: "E não podemos esquecer da língua! Passe a escova suavemente nela la de trás para a ponta da lingua para mandar embora o bafinho e deixar o hálito cheirosinho.",
      },
    ],
  },
  halitose: {
    title: "Tchau Bafinho",
    emoji: "💨",
    description: "Você sabia que às vezes aparece um bafinho na boca? Ele surge quando os restinhos de comida ficam presos entre os dentes ou na lingua e os bichinhos da sujeira (bactérias) começam a fazer uma grande bagunça. Esses bichinhos soltam um cheirinho ruim que vira o bafinho. Mas calma! É fácil mandar eles embora e deixar o hálito cheirosinho de novo.",
    color: "bg-blue-100 border-blue-300",
    completionMessage: "Parabéns, você venceu o bafinho! Agora sua boca está limpinha, fresquinha e cheirosa.",
    brushingGuide: [
      { step: "Missão Fio Dental", emoji: "🧵", description: "Os monstrinhos estão escondidos entre os dentinhos! Pegue o fio dental e passe com cuidado entre um dente e outro, como se estivesse puxando as sujeirinhas para fora como o seu dentista ensinou. Assim, eles não conseguem mais se esconder!" },
      { step: "Escovar os Dentinhos", emoji: "😁", description: "Escovar os Dentinhos e peça para a mamãe ou papai colocar o creme dental. Imagine que sua escova é vassourinha e você vai fazer movimentos de vaivém bem suaves e de bolinha em todos os dentes.", detail: "Escove a frente, atrás e também as partes de mastigar. Quanto mais capricho, mais brilhante o sorriso fica e mais pontos você ganha!" },
      { step: "Escovando da Línguinha", emoji: "👅", description: "E não podemos esquecer da língua! Passe a escova suavemente nela la de trás para a ponta da lingua para mandar embora o bafinho e deixar o hálito cheirosinho." },
      { step: "Beber Água", emoji: "💧", description: "A boca precisa ficar sempre molhadinha. Quando bebemos água, ajudamos a lavar os restinhos de comida e espantamos o bafinho!" },
      { step: "Evitar Muitos Doces", emoji: "🍬", description: "Doces em excesso fazem os monstrinhos da sujeira ficarem mais fortes. Quanto menos doce, mais fraco o bafinho fica!" }
    ],
  },
  carie: {
    title: "Dentinho com Dodói",
    emoji: "🍬",
    description: "Você sabia que o dentinho pode ficar dodói? Isso acontece quando a gente come muitos docinhos e não escova direito. Os bichinhos da cárie (bactérias) aproveitam os restinhos de comida para fazer buracos no dente. Esses buracos doem e deixam o dentinho tristinho. Mas a boa notícia é que a gente consegue proteger o dente todos os dias e deixar ele forte e feliz!",
    color: "bg-yellow-100 border-yellow-300",
    brushingGuide: [
      { step: "Rotina da Manhã", emoji: "🌅", description: "Comece o dia com um sorriso saudável!", detail: "• Acordar\n• Lavar a boca com água e cuspir\n• Beber um copo de água\n• Tomar café da manhã\n• Escovar os dentinhos\n• Escovar a língua" },
      { step: "Rotina Durante o Dia", emoji: "☀️", description: "Mantenha os dentes protegidos o dia todo.", detail: "• Beber bastante água\n• Almoçar\n• Escovar os dentinhos\n• Varrer a língua\n• Comer poucos docinhos (só de vez em quando)" },
      { step: "Rotina da Noite", emoji: "🌙", description: "Prepare-se para uma noite de sono com dentes limpinhos.", detail: "• Jantar\n• Passar o fio dental antes de dormir\n• Escovar os dentinhos\n• Varrer a língua" },
      { step: "Lembrete Especial", emoji: "👩‍⚕️", description: "Ir ao dentista no mínimo a cada 6 meses para fazer uma limpeza completa e manter o sorriso saudável." },
      { step: "E se o buraquinho aparecer?", emoji: "🤔", description: "Esse buraquinho é a cárie, e ele não some sozinho. Quando isso acontece, precisamos ir ao dentista, que é quem sabe consertar o dentinho. O dentista vai limpar o dodói, fechar o buraquinho e deixar o dente forte de novo." }
    ],
  },
};

export const stories: Story[] = [
    {
      title: "O Dente que Queria Brilhar",
      emoji: "🦷✨",
      body: "Dentro de uma boquinha alegre vivia o Dentinho Branco, que adorava sorrir e aparecer em todas as fotos. Ele sonhava em brilhar como uma estrela e ser o mais bonito da turma.\n\nMas havia um problema… toda vez que a criança comia doces e esquecia de escovar, o Vilão Placa aparecia, grudando no Dentinho Branco e deixando-o cada vez mais apagado.\n— “Ah não! Assim nunca vou brilhar de verdade…” — suspirava o dentinho.\n\nUm dia, quando o Dentinho Branco já estava triste, ouviu um barulho divertido: chuá, chuá, chuá!\nEra a Escovinha Mágica, que chegava dançando com suas cerdas macias.\n— “Oi, Dentinho Branco! Estou aqui para te ajudar. Se você deixar, vou espantar o Vilão Placa rapidinho.”\n\nLogo atrás dela veio a Pasta de Flúor, com seu superpoder de escudo protetor.\n— “Não se preocupe! Eu vou fortalecer seu esmalte e você vai brilhar ainda mais!”\n\nDentinho Branco ficou animado e deixou que a Escovinha e a Pasta trabalhassem. Elas fizeram movimentos suaves de um lado para o outro, subindo e descendo, até que o Vilão Placa saiu correndo, derrotado.\n\nNo final, Dentinho Branco olhou para si mesmo e percebeu: estava limpo, forte e brilhando como sempre sonhou!\n— “Uau, agora sim sou uma estrela do sorriso!” — disse todo feliz.",
      moral: "Escovar os dentes todos os dias com creme dental com flúor é o segredo para ter um sorriso que brilha de verdade!"
    },
    {
      title: "A Fada do Fio Dental",
      emoji: "✨🧚‍♀️",
      body: "Na terra dos sorrisos, cada dentinho tinha um segredinho. Eles adoravam brincar juntos, mas havia sempre um espaço entre eles que virava esconderijo para migalhinhas de comida.\n\nO Dentinho da Frente vivia reclamando:\n— “Ai, que cócega! Tem um pedacinho de pão preso aqui e não consigo tirar sozinho!”\n\nO Dentinho do Fundo respondia:\n— “Aqui também! Parece que esses restinhos nunca querem ir embora…”\n\nFoi então que, numa noite tranquila, apareceu voando uma personagem encantada: a Fada do Fio Dental.\nEla brilhava como estrelinhas e segurava um fio mágico nas mãos.\n\n— “Olá, dentinhos! Eu sou a Fada do Fio Dental. Vim para ajudar a limpar os lugares onde a escova não consegue chegar.”\n\nCuriosos, os dentinhos perguntaram:\n— “Mas como você faz isso?”\n\nA fada explicou com carinho:\n— “Eu deslizo suavemente entre vocês, abraçando cada dentinho e levando embora todos os restinhos escondidos. Assim, vocês ficam limpinhos e felizes!”\n\nEntão, ela passou o fio com muito cuidado entre cada dente, e os dentinhos suspiraram aliviados.\n— “Que cócega boa! Agora sim estamos todos livres e fresquinhos!”",
      moral: "O fio dental é o melhor amigo dos dentes, porque chega onde a escova não alcança!"
    },
    {
      title: "O Vilão Açúcar e sua Turma",
      emoji: "🍭👾",
      body: "Numa cidade colorida chamada Boca Feliz, os dentes viviam sorrindo e brincando. Mas, escondido numa esquina escura, morava o terrível Vilão Açúcar, sempre acompanhado de sua turma: Bala Pega-Pega, Refrigerante Borbulhante e Biscoito Crocante.\n\nEles adoravam fazer travessuras. Sempre que a criança comia doces em excesso e esquecia de escovar, eles aproveitavam a festa!\n— “Hahaha! Vamos atacar os dentinhos e fazer buracos neles!” — gritava o Vilão Açúcar.\n\nOs pobres dentes começavam a ficar tristes, enfraquecidos e com manchinhas.\n— “Ai, está doendo…” — chorava o Dentinho de Leite.\n— “Estamos perdendo nossa força!” — lamentava o Molar.\n\nMas de repente, chegou correndo o Super-Flúor, brilhando como um herói com sua capa azul. Ao lado dele estavam a Escovinha Corajosa e o Fio Dental Veloz.\n— “Não tenham medo, dentes! Nós vamos proteger vocês!” — disse o Super-Flúor.\n\nJuntos, eles escovaram, limparam e enxaguaram cada cantinho da Boca Feliz. O Vilão Açúcar e sua turma saíram correndo, derrotados.\n— “Aaah, não! Esses heróis são fortes demais!” — reclamou a Bala Pega-Pega.",
      moral: "Comer doces com moderação e escovar os dentes logo depois é a melhor maneira de derrotar o Vilão Açúcar e sua turma."
    },
    {
      title: "O Exército das Cerdas Mágicas",
      emoji: "🪥✨",
      body: "Na Boca Encantada moravam dezenas de dentinhos felizes. Mas, de vez em quando, as bactérias travessas vinham correndo para tentar fazer bagunça, formando uma gosma chamada placa.\n\nOs dentinhos ficavam preocupados:\n— “Ai, estamos ficando sujos! Quem vai nos ajudar agora?”\n\nFoi nesse momento que surgiu o Exército das Cerdas Mágicas! Cada cerda era como um soldadinho corajoso da Escova de Dentes, que marchava firme de um lado para o outro.\n— “Estamos aqui para proteger vocês, dentinhos! Vamos trabalhar em equipe!” — disseram em coro.\n\nElas se organizaram: algumas subiam e desciam limpando os dentes da frente, outras faziam círculos nos dentes de trás, e várias soldados ainda cuidavam da gengiva com delicadeza.\n\nAs bactérias tentaram resistir, mas logo perceberam que não tinham chance contra um exército tão organizado.\n— “Corram! Não conseguimos vencer essas cerdas mágicas!” — gritaram desesperadas.\n\nNo final, os dentinhos brilharam de alegria:\n— “Obrigada, Exército das Cerdas! Vocês são nossos heróis!”",
      moral: "Cada cerda da escova trabalha como um soldadinho limpando os dentes. Por isso, escovar bem todos os cantinhos é essencial para vencer as bactérias!"
    },
    {
      title: "A Língua Esquecida",
      emoji: "👅✨",
      body: "Na boca da pequena Sofia, todos os dentinhos estavam sempre felizes e limpinhos. A escova e o fio dental trabalhavam juntos todos os dias, e o Vilão Placa já nem ousava aparecer.\n\nMas havia alguém que se sentia muito triste: a Língua.\nEla suspirava sozinha e reclamava baixinho:\n— “Ninguém lembra de mim… fico cheia de restinhos de comida e bactérias, e isso me deixa com um hálito nada legal.”\n\nOs dentes tentavam consolar:\n— “Poxa, amiga Língua, é verdade… mas como podemos ajudar?”\n\nDe repente, a Escovinha Alegre respondeu:\n— “Ora, é simples! Depois de escovar vocês, eu também posso escovar a Língua! É só fazer movimentos suaves de trás para frente, e pronto: tudo limpinho!”\n\nA Língua ficou radiante:\n— “Sério? Então eu também posso ficar fresquinha e sem mau hálito?”\n\nE assim foi feito. No final da escovação, a Escovinha passou delicadamente na Língua, e ela se sentiu renovada.\n— “Uau! Agora sim faço parte da higiene da boca. Que sensação boa!”",
      moral: "A língua também precisa ser escovada! Assim, a boca fica realmente limpa e com hálito fresquinho."
    },
    {
      title: "A Festa dos Dentinhos de Leite",
      emoji: "🦷🎊",
      body: "Na boquinha de Miguel, vivia uma turma animada chamada Dentinhos de Leite. Eles eram pequenos, branquinhos e adoravam brincar juntos.\n\nUm dia, o Dentinho da Frente percebeu algo estranho: estava balançando!\n— “Oh, não! Estou ficando mole! Será que vou cair?” — perguntou assustado.\n\nOs outros dentes tentaram animá-lo:\n— “Não se preocupe! Quando um de nós fica mole, é porque logo chegará um Dentão Permanente para ocupar o lugar.”\n\nFoi então que a Fada do Sorriso apareceu, brilhando como estrelinhas.\n— “É verdade! Os Dentinhos de Leite têm uma missão muito especial: guardar o espaço certinho para os dentes permanentes crescerem fortes e bonitos.”\n\nNaquela noite, o Dentinho da Frente caiu suavemente e foi levado pela fada, que deixou uma moedinha de presente. Logo depois, surgiu o Dentão Permanente, grande e cheio de energia.\n— “Oi, pessoal! Cheguei para continuar o trabalho de vocês: mastigar, sorrir e brilhar!”\n\nOs Dentinhos de Leite fizeram uma festa de despedida, com música e dança.\n— “Estamos felizes por ter ajudado até aqui! Agora é a vez de vocês, Dentões Permanentes!”",
      moral: "Os dentes de leite são muito importantes, pois guardam espaço e cuidam da boca até a chegada dos dentes permanentes."
    },
    {
      title: "O Super-Flúor em Ação",
      emoji: "🦸‍♂️✨",
      body: "Na cidade chamada Boca Feliz, os dentes viviam alegres e brilhantes. Mas, de vez em quando, apareciam os Ácidos Malvados, tentando enfraquecer o esmalte e abrir buraquinhos.\n\nOs dentes tremiam de medo:\n— “Ai, ai! Se esses ácidos ficarem aqui, vamos ficar cheios de cáries!”\n\nFoi nesse momento que surgiu voando um herói com capa azul: o Super-Flúor!\nEle brilhava como uma estrela e trazia um poderoso escudo nas mãos.\n\n— “Não tenham medo, amiguinhos! Eu estou aqui para deixar o esmalte mais forte e proteger vocês contra os ataques dos ácidos!” — disse confiante.\n\nCom seu escudo mágico, o Super-Flúor tocava cada dentinho e criava uma camada protetora invisível. Os Ácidos Malvados tentaram atacar, mas batiam no escudo e desapareciam no ar.\n\nOs dentinhos ficaram encantados:\n— “Uau, agora estamos superprotegidos! Nada pode nos derrotar!”\n\nO Super-Flúor sorriu e explicou:\n— “Mas lembrem-se: eu só consigo agir se vocês me chamarem todos os dias, na hora da escovação, com o creme dental certo!”",
      moral: "O flúor é como um super-herói que fortalece os dentes e os protege das cáries. Use sempre creme dental com flúor na escovação!"
    },
    {
      title: "A Noite da Mamadeira Misteriosa",
      emoji: "🍼🌙",
      body: "Na boquinha da pequena Laura, todos os dentinhos de leite estavam dormindo tranquilos. Mas, de repente, no meio da noite, ouviram um barulho de glub, glub, glub.\n\nEra a Mamadeira Misteriosa, cheia de leite adoçado, que chegava sorrateira toda madrugada.\n— “Shhh, dentinhos… vou ficar por aqui enquanto a Laura dorme.”\n\nOs dentinhos acordaram assustados.\n— “Oh, não! Se esse leite com açúcar ficar em cima da gente a noite toda, vamos enfraquecer e nascerão cáries!” — disse o Dentinho da Frente.\n\nO Molar tentou avisar a Laura, mas ela dormia profundamente, sem nem perceber.\nEnquanto isso, as bactérias aproveitavam a festa, dançando em cima dos dentinhos e produzindo ácidos perigosos.\n\nNo dia seguinte, apareceu a Escovinha Brilhante, indignada:\n— “O que aconteceu aqui? Vocês estão cheios de açúcar grudado!”\nOs dentinhos responderam:\n— “Foi a Mamadeira Misteriosa… ela ficou a noite toda aqui!”\n\nA Escovinha explicou com paciência:\n— “Dormir depois de tomar mamadeira com açúcar é muito perigoso para os dentes. Eles ficam sem defesa a noite inteira! É por isso que precisamos escovar antes de dormir.”",
      moral: "A mamadeira com açúcar à noite pode causar cáries. Antes de dormir, só água e sempre escovar os dentes!"
    },
    {
      title: "O Mistério do Hálito Esquisito",
      emoji: "🌬️🦷",
      body: "Na boquinha de Pedro, todos os dentinhos eram felizes. Mas, de repente, começou a aparecer um problema misterioso: o Hálito Esquisito.\n\nEle chegava devagarinho e dizia:\n— “Hehehe… vou deixar esse hálito nada agradável, e ninguém vai descobrir de onde eu vim!”\n\nOs dentinhos ficaram preocupados:\n— “Ai, ai, por que está acontecendo isso? A gente sempre quer estar limpinho!”\n\nEntão começou a investigação. O Dentinho da Frente notou:\n— “Olhem, tem restinhos de comida presos entre nós!”\nO Molar completou:\n— “E a Língua também não está sendo escovada direito.”\n\nEnquanto discutiam, apareceu a Escovinha Detetive com sua lupa brilhante.\n— “Eu descobri o mistério! O Hálito Esquisito aparece quando a boca não é bem higienizada. Ele gosta de restos de comida, da língua suja e até da boca seca!”\n\nRapidamente, a Escovinha chamou seus amigos: Fio Dental Veloz e Copo d’Água Fresquinha. Juntos, eles limparam os dentes, passaram entre os espacinhos e refrescaram a boca.\n\nO Hálito Esquisito não resistiu e desapareceu na mesma hora.\n— “Ah, não! Fui descoberto!” — resmungou, sumindo no ar.",
      moral: "Para evitar o mau hálito, é importante escovar bem os dentes, a língua, usar fio dental e beber bastante água."
    },
    {
      title: "O Dente Corajoso e o Dentista Amigo",
      emoji: "🦷👩‍⚕️",
      body: "Na boquinha de Clara, vivia o Dentinho Corajoso. Ele era animado e adorava sorrir, mas um dia começou a sentir uma dorzinha diferente.\n— “Ai, o que será isso? Acho que preciso de ajuda…”\n\nOs outros dentes ficaram preocupados.\n— “Será que vamos ter que visitar o dentista? Dizem que é assustador…” — cochichou o Molar.\n\nO Dentinho Corajoso respirou fundo:\n— “Eu não tenho medo! Se for para ficarmos saudáveis, vamos juntos.”\n\nNo consultório, eles conheceram a Dentista Amiga, que usava um jaleco branquinho e tinha um sorriso acolhedor.\n— “Olá, dentinhos! Não precisam ter medo. Eu só quero cuidar de vocês para ficarem fortes e felizes.”\n\nCom instrumentos brilhantes, ela examinou cada cantinho da boca.\n— “Vejam só! Aqui está a dorzinha… mas é apenas um probleminha que vou resolver rapidinho.”\n\nEnquanto trabalhava, a Dentista Amiga conversava e fazia cócegas nos dentinhos. Todos riram e perceberam que não havia nada de assustador ali.\n\nDepois da consulta, o Dentinho Corajoso estava novo em folha e declarou:\n— “Viu só? Ir ao dentista é muito importante e não precisa dar medo!”",
      moral: "O dentista é um amigo dos dentes! Consultas regulares ajudam a manter o sorriso saudável e sem medo."
    },
    {
      title: "As Gengivas Vermelhinhas",
      emoji: "🌸🦷",
      body: "Na boquinha de Miguel, os dentinhos estavam sempre alegres. Eles adoravam brilhar quando ele sorria! Mas, de repente, as Gengivas Vermelhinhas começaram a reclamar:\n\n— “Ai, ai! Estamos sensíveis, coçando e até sangrando um pouquinho. Ninguém está nos cuidando direito!”\n\nOs dentinhos ficaram preocupados.\n— “Mas a Escovinha vem nos visitar todos os dias…” — disse o Dentinho da Frente.\n\nAs Gengivas suspiraram:\n— “Sim, mas Miguel escova correndo, sem caprichar. E o fio dental quase nunca aparece. Assim, restos de comida ficam grudados e nós ficamos doentes.”\n\nEnquanto conversavam, chegaram a Escovinha Brilhante e o Fio Dental Veloz.\n— “Ahá! Descobrimos o problema! Precisamos trabalhar juntos e com calma para que as gengivas fiquem felizes de novo.” — disse a Escovinha.\n\nNo começo, Miguel não entendia por que precisava passar o fio dental todos os dias. Mas, quando viu que suas gengivas melhoravam e paravam de sangrar, ficou animado.\n— “Uau! Elas estão ficando cor-de-rosa de novo!” — comemorou.",
      moral: "Escovar com calma e usar fio dental todos os dias mantém as gengivas saudáveis, sem dor e sem sangramento."
    },
    {
      title: "O Dente que Não Queria Cair",
      emoji: "🌟🦷",
      body: "Na boca de Sofia, todos os dentinhos de leite viviam felizes. Um deles, o Dentinho da Frente, era muito vaidoso e adorava aparecer nos sorrisos. Mas, um dia, ele começou a balançar.\n\n— “Opa! O que está acontecendo comigo? Estou ficando solto!” — disse assustado.\n\nOs outros dentes olharam e explicaram:\n— “É normal, Dentinho. Você já trabalhou bastante cuidando da Sofia até agora. Logo vai chegar um dente permanente para ocupar o seu lugar.”\n\nMas o Dentinho da Frente não queria saber de conversa.\n— “Como assim? Eu não quero ir embora! Gosto de estar aqui, gosto de sorrir para as fotos e brincar com Sofia!”\n\nOs dias passaram, e o dentinho balançava cada vez mais. Às vezes, Sofia ficava mexendo com a língua, e ele reclamava:\n— “Ei, me deixem quieto! Eu ainda quero ficar aqui.”\n\nNuma noite, enquanto Sofia dormia, apareceu a Fada do Sorriso, brilhando como uma estrelinha.\n— “Dentinho da Frente, não fique triste. Todos os dentinhos de leite têm sua missão: cuidar das crianças no comecinho da vida. Depois, é hora de dar espaço para dentes mais fortes e grandes.”\n\nO dentinho pensou, pensou, e percebeu que a fada tinha razão. No dia seguinte, ele se soltou suavemente e foi colocado por Sofia debaixo do travesseiro.\n\nLogo apareceu o Dente Permanente, grandão e brilhante, dizendo:\n— “Pode descansar agora, amiguinho. Eu continuo o trabalho daqui para frente.”",
      moral: "A troca de dentes é natural e faz parte do crescimento. O dente de leite cumpre sua missão e dá lugar ao dente permanente."
    },
    {
      title: "A Festa do Fio Dental",
      emoji: "🎉🦷",
      body: "Na boca de Lucas, os dentinhos estavam animados depois do almoço. Mas, de repente, perceberam algo estranho: restinhos de comida estavam presos entre eles.\n\nO Molar Espertinho resmungou:\n— “Ai, está me incomodando! Tem um pedacinho de carne preso aqui desde ontem.”\n\nO Dentinho da Frente reclamou também:\n— “Aqui ficou uma pipoca! E a Escovinha não conseguiu tirar!”\n\nAs bactérias, escondidas nesses restos, começaram a comemorar:\n— “Eba! Vamos fazer a maior festa de açúcar aqui dentro! Quanto mais comida esquecida, mais fortes ficamos!”\n\nFoi então que apareceu o herói da história: o Fio Dental Veloz, deslizando com sua capa brilhante.\n— “Podem parar essa bagunça! Estou aqui para limpar tudo o que a escova não alcança.”\n\nEle passou suavemente entre os dentinhos, tirando os restos de comida e expulsando as bactérias que tentavam se esconder.\nOs dentinhos vibraram de alegria:\n— “Uau! Agora estamos realmente limpinhos! Nada de bactérias fazendo festa por aqui.”\n\nO Fio Dental sorriu e disse:\n— “Vocês precisam me chamar todos os dias, pelo menos uma vez, combinado? Assim, ninguém mais consegue fazer bagunça entre vocês.”",
      moral: "O fio dental limpa onde a escova não alcança. Usá-lo todos os dias é essencial para dentes fortes e saudáveis."
    },
    {
      title: "O Ataque dos Doces Malvados",
      emoji: "🍭👾",
      body: "Era uma tarde divertida na boquinha de Ana. Ela tinha acabado de comer um monte de balas, pirulitos e chocolates. Os dentinhos até tentaram sorrir, mas logo perceberam algo estranho:\n\nDo nada, surgiram os Doces Malvados, pulando e gritando:\n— “Chegamos para grudar e deixar os dentinhos fraquinhos! Muahahaha!”\n\nAs bactérias, que adoravam açúcar, apareceram correndo para a festa.\n— “Obrigada, Doces Malvados! Agora vamos produzir ácidos e atacar o esmalte dos dentes.”\n\nOs dentinhos começaram a ficar preocupados.\n— “Ai, não! Se esses ácidos ficarem aqui, vamos ganhar cáries!”\n\nDe repente, surgiu a Escovinha Brilhante, acompanhada do Super-Flúor.\n— “Ninguém mexe com esses dentinhos! Estamos aqui para proteger e limpar toda essa bagunça.”\n\nA Escovinha começou a varrer os restos de doces para fora, enquanto o Super-Flúor criou uma barreira protetora em volta dos dentes.\nOs Doces Malvados tentaram resistir, mas foram derrotados e expulsos da boca de Ana.\n\nOs dentes, aliviados, agradeceram:\n— “Ufa! Que susto! Agora entendemos que comer doces de vez em quando tudo bem, mas precisamos sempre escovar depois.”",
      moral: "Comer doces é permitido, mas a escovação depois é essencial para evitar cáries e proteger o sorriso."
    },
    {
      title: "A Turma dos Dentes Unidos",
      emoji: "🤝🦷",
      body: "Na boquinha de Bia, os dentinhos viviam como uma verdadeira família. Eles eram diferentes uns dos outros: tinha o Dentinho da Frente, sempre vaidoso; os Molares, fortes e trabalhadores; e os Caninos, corajosos como guardiões.\n\nApesar de cada um ter sua função, eles tinham um segredo: só conseguiam ser fortes de verdade quando estavam unidos.\n\nUm dia, as bactérias travessas chegaram rindo:\n— “Haha! Vamos atacar vocês separadamente! Se cada um cuidar só de si, será fácil vencer.”\n\nO Dentinho da Frente ficou preocupado:\n— “É verdade… sozinho eu não consigo resistir muito tempo.”\nO Molar concordou:\n— “Eu também não, especialmente quando ficam restos de comida escondidos aqui atrás.”\n\nFoi então que a Escovinha Brilhante apareceu, acompanhada do Fio Dental Veloz e do Super-Flúor.\n— “Escutem, dentinhos! Vocês são uma equipe. Se cada um fizer sua parte, unidos, ninguém poderá vencê-los.”\n\nOs dentinhos se organizaram: os Caninos ajudariam a cortar os alimentos, os Molares a mastigar, e os Dentinhos da Frente fariam o sorriso brilhar. Com a ajuda da escovação, fio dental e flúor, todos ficaram protegidos igualmente.\n\nAs bactérias perceberam que não tinham chance contra uma equipe tão unida e foram embora resmungando.\nOs dentinhos comemoraram juntos:\n— “Viva! Somos diferentes, mas juntos formamos um sorriso forte e feliz!”",
      moral: "Cada dente tem sua função, mas todos precisam trabalhar unidos e bem cuidados para manter o sorriso saudável."
    },
    {
      title: "O Docinho Disfarçado",
      emoji: "🍬🕵️‍♂️",
      body: "Na lancheira de João, morava um doce que parecia inofensivo: o Docinho Disfarçado. Ele usava uma capa brilhante e sempre falava com voz doce e suave:\n— “Olá, João! Sou só uma sobremesa inocente… não posso fazer mal a ninguém!”\n\nOs dentinhos de João ficaram desconfiados.\nO Canino Guardião cochichou:\n— “Será que podemos confiar nele?”\nMas o Dentinho da Frente, curioso, respondeu:\n— “Ah, parece tão simpático! Talvez não seja perigoso.”\n\nAssim que João comeu o docinho e esqueceu de escovar os dentes, o disfarce caiu!\nO Docinho riu alto:\n— “Muahahaha! Eu estava escondendo muito açúcar! Agora as bactérias vão fazer a festa e atacar vocês.”\n\nAs bactérias começaram a trabalhar, produzindo ácidos e tentando furar o esmalte. Os dentinhos tremiam de medo.\n\nDe repente, apareceu a Escovinha Brilhante, seguida pelo Fio Dental Veloz e o Super-Flúor.\n— “Achamos que tinha algo errado! Vamos acabar com essa bagunça agora mesmo.”\n\nA Escovinha varreu todo o açúcar, o Fio Dental tirou os pedacinhos escondidos, e o Super-Flúor criou um escudo protetor contra os ácidos.\n\nDerrotado, o Docinho Disfarçado fugiu, prometendo nunca mais enganar os dentinhos.\n\nOs dentes suspiraram aliviados:\n— “Ufa! Aprendemos a lição: nem todo docinho é tão inocente quanto parece. Precisamos sempre escovar depois de comer.”",
      moral: "Alguns alimentos parecem inofensivos, mas escondem muito açúcar. Escovar os dentes depois das refeições é a melhor defesa contra as cáries."
    },
    {
      title: "O Time do Sorriso Campeão",
      emoji: "🏆😁",
      body: "Na cidade da Boca Feliz, estava acontecendo um grande campeonato: o Torneio dos Sorrisos. Cada sorriso precisava estar limpo, saudável e brilhante para ganhar a medalha de campeão.\n\nOs dentinhos de Clara estavam empolgados, mas também preocupados.\n— “Será que vamos conseguir? Temos que trabalhar juntos!” — disse o Molar Fortão.\n— “Sim, precisamos estar bem cuidados, senão não teremos força para brilhar.” — completou o Dentinho da Frente.\n\nFoi então que chegou o Time do Sorriso Campeão: a Escovinha Brilhante, o Fio Dental Veloz e o Super-Flúor Protetor.\n— “Estamos prontos para treinar vocês! Se trabalharmos em equipe, ninguém vai conseguir derrotar esse sorriso.”\n\nDurante os treinos, a Escovinha corria de um lado para o outro, limpando cada superfície. O Fio Dental passava entre os dentinhos mais apertados, tirando os restinhos de comida escondidos. E o Super-Flúor deixava todos mais fortes e resistentes contra ataques de cáries.\n\nAs bactérias tentaram atrapalhar o time, entrando com restos de doces e ácidos. Mas não tiveram chance contra tanta união.\n\nNo dia do campeonato, os dentinhos de Clara sorriram com todo o brilho. O público aplaudiu de pé:\n— “Uau, que sorriso lindo e saudável!”\n\nE assim, o Time do Sorriso Campeão venceu a disputa, mostrando que quando escovação, fio dental e flúor trabalham juntos, a vitória é garantida.",
      moral: "Um sorriso campeão precisa de um time completo: escovação, fio dental e flúor todos os dias."
    },
    {
      title: "A Aventura do Dente Perdido",
      emoji: "🦷✨",
      body: "Na boquinha de Luísa, um dentinho de leite começou a balançar de um lado para o outro. Ele era pequeno, mas muito corajoso, e se chamava Dentinho Valente.\n\n— “Opa, o que está acontecendo comigo? Estou ficando solto!” — disse ele, meio assustado.\n\nOs outros dentes cochicharam:\n— “É a sua hora, Dentinho Valente. Você já cuidou da Luísa por muitos anos. Agora vai começar sua aventura e dar lugar a um novo dente permanente.”\n\nMas o Dentinho não sabia se estava pronto para partir. Ele gostava de sorrir nas fotos, de mastigar os alimentos e de brilhar nos dias de escovação.\n— “Será que a Luísa vai sentir minha falta?”\n\nNo recreio da escola, enquanto Luísa mordia uma maçã crocante, o Dentinho Valente decidiu:\n— “Chegou a hora da minha grande aventura!”\n\nCom um plim, ele se soltou e ficou preso na maçã. Luísa olhou assustada e depois sorriu:\n— “Meu primeiro dentinho caiu!”\n\nNaquela noite, ela colocou o dentinho embaixo do travesseiro. O Dentinho Valente não tinha medo, pois sabia que encontraria a Fada do Sorriso, que levaria ele para um novo lar brilhante.\n\nEnquanto isso, em sua boquinha, um espacinho ficou reservado para a chegada de um dente permanente, maior e mais forte.\n\nOs outros dentes o receberam com alegria:\n— “Seja bem-vindo! Juntos vamos proteger o sorriso da Luísa.”",
      moral: "A queda do primeiro dente de leite é uma aventura especial e natural. Ele dá espaço para os dentes permanentes crescerem fortes e saudáveis."
    },
    {
      title: "O Riso que Vencia o Cansaço",
      emoji: "🌙😁",
      body: "Era hora de dormir na casa de Pedro. Depois de brincar o dia inteiro, ele estava exausto e só queria se jogar na cama.\n— “Ahhh… só hoje eu não vou escovar os dentes. Estou com tanto sono…” — murmurou, bocejando.\n\nLá dentro da boquinha, os dentinhos ficaram aflitos.\n— “Oh, não! Se ele dormir sem escovar, os restos de comida vão ficar grudados em nós, e as bactérias vão aproveitar a noite para trabalhar.”\n\nDe repente, surgiu o Cansaço, um monstrinho preguiçoso e pesado, que cochichava no ouvido de Pedro:\n— “Deixa pra amanhã… um dia sem escovar não faz mal…”\n\nMas, no mesmo instante, apareceu a Escovinha Brilhante, pulando de alegria.\n— “Não, não, não! O riso que vence o cansaço é aquele que brilha antes de dormir. Vamos lá, Pedro, só alguns minutinhos e depois você descansa tranquilo.”\n\nOs dentinhos começaram a cantar, animando o menino:\n— “Escova, escova, vamos brilhar,\nAssim o sono pode chegar!”\n\nPedro riu com a musiquinha e levantou da cama. Escovou os dentes, usou o fio dental, enxaguou a boca e se deitou de novo. Agora sim, com os dentinhos limpinhos e felizes, o sono chegou bem mais gostoso.\n\nAs bactérias resmungaram, derrotadas:\n— “Droga, não vamos conseguir fazer festa hoje à noite…”\n\nE os dentinhos comemoraram:\n— “Viva! Mais uma vitória contra o Cansaço preguiçoso!”",
      moral: "Mesmo cansado, nunca vá dormir sem escovar os dentes. A escovação da noite é a mais importante para manter o sorriso saudável."
    },
    {
      title: "O Tesouro do Baú do Sorriso",
      emoji: "💎😁",
      body: "Na pequena cidade chamada Boca Encantada, existia uma lenda antiga: o Baú do Sorriso, um tesouro mágico escondido dentro de cada criança. Diziam que só quem cuidasse bem dos dentes poderia abrir o baú e descobrir o que havia lá dentro.\n\nOs dentinhos de Helena sonhavam em ver esse tesouro. Um dia, reunidos, decidiram conversar:\n— “Será que esse baú realmente existe?” — perguntou o Dentinho da Frente.\n— “Eu acho que sim… mas ele só se abre com a chave da prevenção.” — respondeu o Molar Fortão.\n\nMas a chave não era de ouro, nem de prata. Era formada por três segredos: escovação caprichada, fio dental todos os dias e visitas regulares ao dentista.\n\nHelena, curiosa, resolveu testar. Escovou os dentes direitinho, sem pressa, passou o fio dental e, de tempos em tempos, visitava a Dentista Amiga.\n\nDe repente, numa manhã, ao olhar no espelho, os dentinhos brilharam tanto que um pequeno baú mágico apareceu em seu sorriso.\nEle se abriu sozinho e, dentro dele, havia algo precioso: um sorriso saudável, forte e feliz, que iluminava o rosto inteiro de Helena e encantava todos ao redor.\n\nOs dentinhos comemoraram:\n— “Descobrimos o verdadeiro tesouro! O cuidado diário é o que mantém o sorriso brilhante e cheio de vida.”\n\nE assim, Helena aprendeu que a prevenção era mais valiosa que qualquer ouro ou joia, pois garantia um sorriso bonito para sempre.",
      moral: "O maior tesouro é o sorriso saudável, conquistado com prevenção e cuidado todos os dias."
    },
    {
      title: "O Segredo da Escova Nova",
      emoji: "🪥✨",
      body: "Na pia do banheiro de Rafa, havia uma escova de dentes que já estava bem cansada. Suas cerdas estavam abertas e despenteadas, como se fossem cabelinhos bagunçados.\nEla suspirava baixinho:\n— “Ah, já não consigo limpar direito… sinto que meu tempo está acabando.”\n\nOs dentinhos de Rafa perceberam e começaram a cochichar:\n— “A Escovinha está ficando fraquinha, não consegue mais tirar toda a sujeira!”\n\nFoi então que, numa manhã, apareceu uma caixinha colorida com uma novidade brilhante lá dentro: era a Escova Nova, com cerdas macias e alinhadinhas, cheias de energia.\n— “Olá, amigos! Cheguei para ajudar! Tenho um segredo: quando uma escova fica velhinha, precisa ser trocada para que o sorriso continue limpo e saudável.”\n\nA Escova Antiga sorriu, mesmo fraquinha:\n— “É verdade. Eu já cumpri minha missão. Agora é sua vez de cuidar dos dentinhos do Rafa.”\n\nA Escova Nova não perdeu tempo: limpou cada cantinho da boca, passando com carinho pelos dentes da frente, pelos molares do fundo e até pelas gengivas. Os dentinhos vibraram de alegria:\n— “Uau! Estamos super limpos! Seja bem-vinda, Escova Nova!”",
      moral: "Escovas de dentes precisam ser trocadas a cada três meses ou quando as cerdas ficam abertas. Assim, a limpeza é sempre completa e o sorriso fica protegido."
    },
    {
      title: "O Sapo que Não Gostava de Água",
      emoji: "🐸💧",
      body: "Na beira de um lago vivia um sapinho chamado Tito. Ao contrário dos outros sapos, ele não gostava de beber água.\n— “Água? Eca! Prefiro suco doce ou refrigerante!” — dizia Tito, pulando para longe sempre que alguém falava em hidratação.\n\nCom o tempo, Tito começou a sentir a boca seca. Seus dentinhos (de sapinho!) reclamavam:\n— “Está difícil viver aqui dentro! Sem água, não temos saliva suficiente para nos proteger das bactérias.”\n\nAs bactérias, espertinhas, começaram a fazer festa:\n— “Viva! Sem saliva, podemos atacar os dentinhos à vontade!”\n\nAté que um dia, Tito percebeu que estava sem energia para brincar e cantar com os amigos. Uma coruja sábia explicou:\n— “A água é um presente da natureza. Ela lava a boca, ajuda a saliva a proteger os dentes e mantém o corpo forte.”\n\nTito resolveu experimentar. Tomou um grande gole de água fresca do lago e sentiu um alívio imediato. Sua boca ficou molhadinha, os dentinhos felizes e as bactérias, derrotadas.\n— “Que delícia! Nunca mais vou deixar de beber água!” — disse Tito, pulando alegremente.",
      moral: "Beber bastante água todos os dias é essencial para manter a boca saudável, evitar mau hálito e deixar o corpo cheio de energia."
    },
    {
      title: "A Visita ao Castelo do Dentista",
      emoji: "🏰🦷",
      body: "Lá no Reino dos Sorrisos vivia uma menina chamada Sofia. Ela cuidava direitinho dos dentes, mas sempre sentia um friozinho na barriga quando alguém falava:\n— “Está na hora de ir ao dentista!”\n\nCerto dia, Sofia sonhou que seus dentinhos eram cavaleiros e viviam em um castelo mágico. O castelo precisava de reparos de tempos em tempos, e só um mago bondoso chamado Dentista podia ajudar.\n\nQuando Sofia chegou ao consultório, percebeu que o dentista não era assustador, mas sim o guardião dos sorrisos. Ele examinou cada dentinho, usou ferramentas mágicas para tirar sujeirinhas escondidas e contou histórias engraçadas para deixá-la tranquila.\n\nOs dentinhos comemoraram lá dentro:\n— “Oba! Estamos limpinhos, fortes e prontos para brilhar!”\n\nSofia saiu feliz e entendeu que visitar o dentista não era motivo de medo, mas sim uma aventura importante para manter seu castelo do sorriso protegido.",
      moral: "Ir ao dentista regularmente mantém os dentes fortes, evita problemas e garante um sorriso sempre saudável."
    },
    {
      title: "O Dentinho Aventureiro e o Péssimo Hábito",
      emoji: "🚫🦷",
      body: "Lucas tinha um costume estranho: sempre que ficava ansioso ou entediado, começava a roer as unhas e morder tampas de caneta. Ele achava divertido, mas seus dentinhos não gostavam nada disso.\n\nO Dentinho Aventureiro, o da frente, foi o primeiro a reclamar:\n— “Ai! Isso dói! Não fui feito para roer coisas duras. Posso me quebrar ou ficar torto!”\n\nAs unhas, coitadas, também não estavam felizes:\n— “Ei, não é justo! Estamos sempre machucadas e feias por causa desse hábito.”\n\nUm dia, o dentinho de Lucas ficou tão fraquinho que quase lascou. Foi aí que ele percebeu que aquele costume não era saudável.\n\nA mamãe explicou:\n— “Roer unhas ou morder objetos machuca os dentes e as gengivas. É melhor usar os dentes apenas para mastigar os alimentos.”\n\nLucas decidiu parar e, no lugar do hábito ruim, começou a brincar com uma bolinha antiestresse sempre que ficava ansioso. Seus dentinhos ficaram aliviados e voltaram a brilhar de felicidade.",
      moral: "Os dentes não são ferramentas para roer objetos. Eles foram feitos para mastigar os alimentos e precisam ser cuidados com carinho."
    }
  ];

export const checklistTasks: ChecklistTask[] = [
  { key: 'brushThreeTimes', label: 'Escovei os dentes três vezes hoje?', emoji: '🪥' },
  { key: 'floss', label: 'Usei fio dental?', emoji: '🧵' },
  { key: 'fruits', label: 'Comi frutas?', emoji: '🍎' },
  { key: 'vegetables', label: 'Comi verduras e legumes?', emoji: '🥦' },
  { key: 'fewSweets', label: 'Comi poucos docinhos?', emoji: '🍬' },
  { key: 'water', label: 'Bebi bastante água?', emoji: '💧' }
];

export const authors = [
"Anita Beatriz Barbosa Santos",
"Francisco Antônio Santana de Melo",
"José Elerson Porto Costa",
"Letícia Thicyanne Melo Godoy Sousa",
"Marina Gomes da Silva",
"João Vitor Lins"
  // Adicione mais autores conforme necessário
];
export const orientadores = [
"Isabelly Eduarda Avelino",
"Emily Feitosa Rêgo"
  // Adicione mais autores conforme necessário
];

export const parentsInfo = [
  {
    title: "Recomendações Gerais",
    emoji: "📅",
    color: "green",
    points: [
      "Primeira consulta até o surgimento do primeiro dente.",
      "A higiene bucal deve começar quando o primeiro dente nascer.",
      "Se o bebê usar fórmula, mamadeira noturna ou já consumir outros alimentos, a limpeza pode ser feita antes mesmo do primeiro dentinho, passando gaze ou dedeira umedecida na gengiva.",
      "Usar escova infantil de cerdas macias e pequena assim que erupcionar o primeiro dente.",
      "Introduzir creme dental fluoretado (na quantidade certa para a idade) desde o primeiro dente.",
      "Supervisionar a escovação até que a criança tenha coordenação suficiente (em média até 8 anos).",
      "Ensinar e incentivar o uso diário do fio dental quando os dentes tiverem contato entre si.",
      "Realizar escovação pelo menos 3x ao dia, sempre antes de dormir.",
      "Incentivar boa alimentação, pouco açúcar e bastante água.",
      "Levar a criança ao odontopediatra regularmente para prevenção e acompanhamento com consultas de rotina a cada 6 meses com o dentista.",
      "Dar o exemplo: quando os pais cuidam bem da própria boca, a criança tende a seguir."
    ]
  },
  {
    title: "Escovação infantil e uso do creme dental com flúor",
    emoji: "🪥",
    color: "indigo",
    points: [
      "<strong>Bebês e crianças até 3 anos:</strong> Escovação feita por um adulto, com escova infantil de cerdas macias. Quantidade de pasta: grão de arroz cru (creme dental com 1.000 ppm de flúor).",
      "<strong>De 3 a 6 anos:</strong> Escova infantil, sempre com supervisão de um adulto. Quantidade de pasta: grão de ervilha (creme dental com 1.000 ppm de flúor).",
      "<strong>A partir dos 6 anos:</strong> A criança pode começar a escovar sozinha, mas ainda precisa de supervisão. Quantidade de pasta: cerca de meio centímetro, com 1.100 a 1.500 ppm de flúor."
    ]
  },
  {
    title: "Cárie",
    emoji: "🍬",
    color: "yellow",
    description: "A cárie é uma das doenças bucais mais comuns na infância. Ela acontece quando os restos de alimentos, principalmente ricos em açúcar, ficam acumulados nos dentes e servem de alimento para as bactérias, que produzem ácidos e “quebram” o esmalte dental. Isso pode causar dor, sensibilidade e até perda do dente se não for tratado.",
    subTitle: "Cuidados importantes:",
    points: [
      "Escovação dos dentes pelo menos 3x ao dia, com creme dental fluoretado na quantidade adequada para a idade.",
      "Uso de fio dental diário.",
      "Reduzir a frequência do consumo de alimentos açucarados (balas, bolachas, refrigerantes).",
      "Incentivar uma alimentação saudável e consumo de água.",
      "Levar a criança ao dentista regularmente para prevenção e acompanhamento."
    ]
  },
  {
    title: "Halitose",
    emoji: "💨",
    color: "blue",
    description: "A halitose (mau hálito) em crianças é mais comum do que parece e pode ter várias causas. As principais são: higiene bucal insuficiente, acúmulo de placa e restos de comida nos dentes ou língua, cáries, gengivite, boca seca, respiração pela boca, amigdalite ou até problemas gastrointestinais.",
    subTitle: "Cuidados importantes:",
    points: [
      "Escovar os dentes e a língua pelo menos 2x ao dia, sempre com supervisão.",
      "Usar creme dental com flúor na quantidade certa para a idade.",
      "Incentivar a ingestão de água ao longo do dia.",
      "Manter consultas regulares no dentista para avaliar dentes e gengiva."
    ]
  },
  {
    title: "Gengivite",
    emoji: "🩸",
    color: "red",
    description: "A gengivite é uma inflamação da gengiva, geralmente causada pelo acúmulo de placa bacteriana por falta de higiene adequada. Nos pequenos, costuma aparecer como gengiva vermelha, inchada e que sangra na hora da escovação.",
    subTitle: "Cuidados importantes:",
    points: [
      "Escovação diária dos dentes e da gengiva, sempre supervisionada.",
      "Uso de creme dental com flúor na quantidade certa para a idade.",
      "Fio dental todos os dias, principalmente no período da noite antes da última escovação.",
      "Limpeza suave da gengiva mesmo que sangre — parar de escovar só piora a inflamação.",
      "Incentivar boa alimentação e bastante água.",
      "Consultas regulares com o dentista para prevenção e tratamento."
    ]
  }
];
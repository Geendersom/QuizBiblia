export type Question = {
  id: number
  pergunta: string
  alternativas: string[]
  correta: number
}

export type Level = {
  id: number
  nome: 'FÁCIL' | 'MÉDIO' | 'DIFÍCIL'
  perguntas: Question[]
}

export const LEVELS: Level[] = [
  // ===============================
  // NÍVEL 1 — FÁCIL (1–50)
  // ===============================
  {
    id: 1,
    nome: 'FÁCIL',
    perguntas: [
      {
        id: 1,
        pergunta: 'Quem construiu a arca?',
        alternativas: ['Moisés', 'Noé', 'Abraão', 'Davi'],
        correta: 1
      },
      {
        id: 2,
        pergunta: 'Quem foi o primeiro homem?',
        alternativas: ['Noé', 'Abraão', 'Adão', 'Moisés'],
        correta: 2
      },
      {
        id: 3,
        pergunta: 'Quem foi engolido por um grande peixe?',
        alternativas: ['Pedro', 'Jonas', 'Paulo', 'Elias'],
        correta: 1
      },
      {
        id: 4,
        pergunta: 'Quem abriu o Mar Vermelho?',
        alternativas: ['Josué', 'Abraão', 'Moisés', 'Davi'],
        correta: 2
      },
      {
        id: 5,
        pergunta: 'Jesus nasceu em qual cidade?',
        alternativas: ['Jerusalém', 'Belém', 'Nazaré', 'Roma'],
        correta: 1
      },
      {
        id: 6,
        pergunta: 'Quantos dias durou a criação do mundo?',
        alternativas: ['5 dias', '6 dias', '7 dias', '8 dias'],
        correta: 2
      },
      {
        id: 7,
        pergunta: 'Qual foi o primeiro livro da Bíblia?',
        alternativas: ['Êxodo', 'Gênesis', 'Levítico', 'Números'],
        correta: 1
      },
      {
        id: 8,
        pergunta: 'Que mulher colocou o filho num cesto e lançou-o no rio?',
        alternativas: ['Ana', 'Rebeca', 'Joquebede', 'Raquel'],
        correta: 2
      },
      {
        id: 9,
        pergunta: 'Qual era o nome do primeiro casal?',
        alternativas: ['Noé e Sara', 'Adão e Eva', 'Abraão e Sara', 'Moisés e Zípora'],
        correta: 1
      },
      {
        id: 10,
        pergunta: 'Quem recebeu as tábuas dos 10 mandamentos?',
        alternativas: ['Josué', 'Davi', 'Moisés', 'Abraão'],
        correta: 2
      },
      {
        id: 11,
        pergunta: 'Quantos discípulos Jesus escolheu?',
        alternativas: ['10', '11', '12', '13'],
        correta: 2
      },
      {
        id: 12,
        pergunta: 'Qual é o nome do jardim onde Adão e Eva viviam?',
        alternativas: ['Jardim do Éden', 'Jardim de Getsêmani', 'Jardim do Rei', 'Jardim de Babilônia'],
        correta: 0
      },
      {
        id: 13,
        pergunta: 'Quem matou Golias?',
        alternativas: ['Saul', 'Davi', 'Salomão', 'Josué'],
        correta: 1
      },
      {
        id: 14,
        pergunta: 'Qual era o nome do filho de Abraão que foi oferecido em sacrifício?',
        alternativas: ['Ismael', 'Isaque', 'Jacó', 'Esaú'],
        correta: 1
      },
      {
        id: 15,
        pergunta: 'Quem foi vendido como escravo pelos irmãos?',
        alternativas: ['Benjamim', 'Judá', 'José', 'Rúben'],
        correta: 2
      },
      {
        id: 16,
        pergunta: 'Qual era o nome da mãe de Jesus?',
        alternativas: ['Isabel', 'Maria', 'Ana', 'Joana'],
        correta: 1
      },
      {
        id: 17,
        pergunta: 'Quantos animais de cada espécie Noé levou para a arca?',
        alternativas: ['1 par', '2 pares', '7 pares', '10 pares'],
        correta: 1
      },
      {
        id: 18,
        pergunta: 'Quem foi o irmão mais velho de Caim e Abel?',
        alternativas: ['Não havia', 'Set', 'Enoque', 'Lameque'],
        correta: 1
      },
      {
        id: 19,
        pergunta: 'Qual era o nome da mulher que riu quando soube que teria um filho na velhice?',
        alternativas: ['Rebeca', 'Raquel', 'Sara', 'Ana'],
        correta: 2
      },
      {
        id: 20,
        pergunta: 'Quem foi transformado em estátua de sal?',
        alternativas: ['Mulher de Ló', 'Mulher de Noé', 'Débora', 'Ester'],
        correta: 0
      },
      {
        id: 21,
        pergunta: 'Qual era o nome da serpente no jardim do Éden?',
        alternativas: ['Não tinha nome', 'Satanás', 'Demônio', 'Lúcifer'],
        correta: 0
      },
      {
        id: 22,
        pergunta: 'Quantas pragas foram enviadas ao Egito?',
        alternativas: ['7', '10', '12', '40'],
        correta: 1
      },
      {
        id: 23,
        pergunta: 'Quem construiu uma torre para chegar ao céu?',
        alternativas: ['Os egípcios', 'Os babilônios', 'Os romanos', 'Os israelitas'],
        correta: 1
      },
      {
        id: 24,
        pergunta: 'Qual era o nome do lugar onde Jesus foi crucificado?',
        alternativas: ['Monte Sinai', 'Gólgota', 'Monte das Oliveiras', 'Monte Sião'],
        correta: 1
      },
      {
        id: 25,
        pergunta: 'Quem negou Jesus três vezes?',
        alternativas: ['João', 'Tiago', 'Pedro', 'André'],
        correta: 2
      },
      {
        id: 26,
        pergunta: 'Qual era o nome do mar onde Jesus andou sobre as águas?',
        alternativas: ['Mar Vermelho', 'Mar Morto', 'Mar da Galileia', 'Mar Mediterrâneo'],
        correta: 2
      },
      {
        id: 27,
        pergunta: 'Quantos livros tem o Novo Testamento?',
        alternativas: ['25', '26', '27', '28'],
        correta: 2
      },
      {
        id: 28,
        pergunta: 'Qual era o nome do primeiro rei de Israel?',
        alternativas: ['Davi', 'Salomão', 'Saul', 'Josias'],
        correta: 2
      },
      {
        id: 29,
        pergunta: 'Quem escreveu o livro de Salmos?',
        alternativas: ['Salomão', 'Davi', 'Moisés', 'Jeremias'],
        correta: 1
      },
      {
        id: 30,
        pergunta: 'Qual era o nome do filho pródigo?',
        alternativas: ['Não tinha nome', 'João', 'Pedro', 'Tiago'],
        correta: 0
      },
      {
        id: 31,
        pergunta: 'Quem foi lançado na cova dos leões?',
        alternativas: ['José', 'Sansão', 'Daniel', 'Neemias'],
        correta: 2
      },
      {
        id: 32,
        pergunta: 'Qual era o nome do apóstolo que traiu Jesus?',
        alternativas: ['Judas', 'Pedro', 'João', 'Tomé'],
        correta: 0
      },
      {
        id: 33,
        pergunta: 'Quem foi ressuscitado por Jesus em Betânia?',
        alternativas: ['Pedro', 'Lázaro', 'João', 'Jairo'],
        correta: 1
      },
      {
        id: 34,
        pergunta: 'Qual era o nome do primeiro livro do Novo Testamento?',
        alternativas: ['Marcos', 'Lucas', 'João', 'Mateus'],
        correta: 3
      },
      {
        id: 35,
        pergunta: 'Quantos anos Noé tinha quando começou a chover?',
        alternativas: ['400', '500', '600', '700'],
        correta: 2
      },
      {
        id: 36,
        pergunta: 'Qual era o nome da irmã de Moisés?',
        alternativas: ['Zípora', 'Miriã', 'Débora', 'Raquel'],
        correta: 1
      },
      {
        id: 37,
        pergunta: 'Quem foi transformado em pilar de sal?',
        alternativas: ['Mulher de Ló', 'Sara', 'Rebeca', 'Raquel'],
        correta: 0
      },
      {
        id: 38,
        pergunta: 'Qual era o nome do anjo que apareceu a Maria?',
        alternativas: ['Miguel', 'Gabriel', 'Rafael', 'Uriel'],
        correta: 1
      },
      {
        id: 39,
        pergunta: 'Quantos dias Jesus ficou no deserto?',
        alternativas: ['30 dias', '40 dias', '50 dias', '60 dias'],
        correta: 1
      },
      {
        id: 40,
        pergunta: 'Qual era o nome do lugar onde Jesus nasceu?',
        alternativas: ['Nazaré', 'Belém', 'Jerusalém', 'Galiléia'],
        correta: 1
      },
      {
        id: 41,
        pergunta: 'Quem foi o pai de João Batista?',
        alternativas: ['José', 'Zacarias', 'João', 'Tiago'],
        correta: 1
      },
      {
        id: 42,
        pergunta: 'Qual era o nome da mulher samaritana que conversou com Jesus?',
        alternativas: ['Não tinha nome', 'Maria', 'Marta', 'Salomé'],
        correta: 0
      },
      {
        id: 43,
        pergunta: 'Quantos pães e peixes Jesus multiplicou para alimentar 5000 pessoas?',
        alternativas: ['5 pães e 2 peixes', '7 pães e 3 peixes', '10 pães e 5 peixes', '12 pães e 2 peixes'],
        correta: 0
      },
      {
        id: 44,
        pergunta: 'Qual era o nome do discípulo que duvidou da ressurreição?',
        alternativas: ['Pedro', 'Tomé', 'Judas', 'João'],
        correta: 1
      },
      {
        id: 45,
        pergunta: 'Quem foi o primeiro mártir cristão?',
        alternativas: ['Paulo', 'Pedro', 'Estêvão', 'Tiago'],
        correta: 2
      },
      {
        id: 46,
        pergunta: 'Qual era o nome do rio onde Jesus foi batizado?',
        alternativas: ['Rio Jordão', 'Rio Nilo', 'Rio Eufrates', 'Rio Tigre'],
        correta: 0
      },
      {
        id: 47,
        pergunta: 'Quantos mandamentos existem?',
        alternativas: ['8', '10', '12', '15'],
        correta: 1
      },
      {
        id: 48,
        pergunta: 'Qual era o nome do lugar onde Jesus fez o primeiro milagre?',
        alternativas: ['Cafarnaum', 'Caná da Galileia', 'Betânia', 'Jerusalém'],
        correta: 1
      },
      {
        id: 49,
        pergunta: 'Quem foi o autor do livro de Apocalipse?',
        alternativas: ['Paulo', 'Pedro', 'João', 'Lucas'],
        correta: 2
      },
      {
        id: 50,
        pergunta: 'Qual era o nome da cidade onde Jesus cresceu?',
        alternativas: ['Belém', 'Jerusalém', 'Nazaré', 'Galiléia'],
        correta: 2
      }
    ]
  },

  // ===============================
  // NÍVEL 2 — MÉDIO (51–100)
  // ===============================
  {
    id: 2,
    nome: 'MÉDIO',
    perguntas: [
      {
        id: 51,
        pergunta: 'Quem foi lançado na cova dos leões?',
        alternativas: ['José', 'Sansão', 'Daniel', 'Neemias'],
        correta: 2
      },
      {
        id: 52,
        pergunta: 'Qual era o nome do gigante derrotado por Davi?',
        alternativas: ['Golias', 'Sansão', 'Faraó', 'Saul'],
        correta: 0
      },
      {
        id: 53,
        pergunta: 'Quem interpretou os sonhos do faraó?',
        alternativas: ['Daniel', 'José', 'Moisés', 'Abraão'],
        correta: 1
      },
      {
        id: 54,
        pergunta: 'Qual livro vem depois de Salmos?',
        alternativas: ['Jó', 'Provérbios', 'Eclesiastes', 'Cantares'],
        correta: 1
      },
      {
        id: 55,
        pergunta: 'Quantos discípulos Jesus escolheu?',
        alternativas: ['10', '11', '12', '13'],
        correta: 2
      },
      {
        id: 56,
        pergunta: 'Qual era o nome da esposa de Abraão?',
        alternativas: ['Rebeca', 'Raquel', 'Sara', 'Ana'],
        correta: 2
      },
      {
        id: 57,
        pergunta: 'Quem foi o rei mais sábio de Israel?',
        alternativas: ['Davi', 'Salomão', 'Saul', 'Josias'],
        correta: 1
      },
      {
        id: 58,
        pergunta: 'Qual era o nome do filho de Davi que se tornou rei?',
        alternativas: ['Absalão', 'Salomão', 'Adonias', 'Amnon'],
        correta: 1
      },
      {
        id: 59,
        pergunta: 'Quantos livros tem o Antigo Testamento?',
        alternativas: ['37', '38', '39', '40'],
        correta: 2
      },
      {
        id: 60,
        pergunta: 'Quem foi o profeta que desafiou os profetas de Baal?',
        alternativas: ['Elias', 'Eliseu', 'Isaías', 'Jeremias'],
        correta: 0
      },
      {
        id: 61,
        pergunta: 'Qual era o nome do lugar onde Jesus foi transfigurado?',
        alternativas: ['Monte Sinai', 'Monte das Oliveiras', 'Monte Tabor', 'Monte Sião'],
        correta: 2
      },
      {
        id: 62,
        pergunta: 'Quem foi o último juiz de Israel?',
        alternativas: ['Gideão', 'Sansão', 'Eli', 'Samuel'],
        correta: 3
      },
      {
        id: 63,
        pergunta: 'Qual era o nome da mulher que ungiu os pés de Jesus?',
        alternativas: ['Maria Madalena', 'Maria de Betânia', 'Joana', 'Susana'],
        correta: 1
      },
      {
        id: 64,
        pergunta: 'Quantos anos durou o reinado de Salomão?',
        alternativas: ['30 anos', '40 anos', '50 anos', '60 anos'],
        correta: 1
      },
      {
        id: 65,
        pergunta: 'Qual era o nome do profeta que foi levado ao céu em um redemoinho?',
        alternativas: ['Elias', 'Eliseu', 'Isaías', 'Ezequiel'],
        correta: 0
      },
      {
        id: 66,
        pergunta: 'Quem foi o autor do livro de Hebreus?',
        alternativas: ['Paulo', 'Lucas', 'Desconhecido', 'João'],
        correta: 2
      },
      {
        id: 67,
        pergunta: 'Qual era o nome do sumo sacerdote que condenou Jesus?',
        alternativas: ['Anás', 'Caifás', 'Herodes', 'Pilatos'],
        correta: 1
      },
      {
        id: 68,
        pergunta: 'Quantos milagres Jesus fez durante seu ministério?',
        alternativas: ['Mais de 30', 'Mais de 35', 'Mais de 40', 'Mais de 45'],
        correta: 1
      },
      {
        id: 69,
        pergunta: 'Qual era o nome do rio onde Naamã foi curado?',
        alternativas: ['Rio Jordão', 'Rio Nilo', 'Rio Eufrates', 'Rio Tigre'],
        correta: 0
      },
      {
        id: 70,
        pergunta: 'Quem foi o primeiro rei de Judá após a divisão?',
        alternativas: ['Roboão', 'Jeroboão', 'Abias', 'Asa'],
        correta: 0
      },
      {
        id: 71,
        pergunta: 'Qual era o nome da cidade onde Jesus ressuscitou Lázaro?',
        alternativas: ['Betânia', 'Belém', 'Nazaré', 'Cafarnaum'],
        correta: 0
      },
      {
        id: 72,
        pergunta: 'Quantos anos tinha Jesus quando começou seu ministério?',
        alternativas: ['28', '30', '32', '35'],
        correta: 1
      },
      {
        id: 73,
        pergunta: 'Qual era o nome do livro que vem antes de Isaías?',
        alternativas: ['Provérbios', 'Eclesiastes', 'Cantares', 'Jó'],
        correta: 2
      },
      {
        id: 74,
        pergunta: 'Quem foi o profeta que profetizou sobre o Messias?',
        alternativas: ['Jeremias', 'Isaías', 'Ezequiel', 'Daniel'],
        correta: 1
      },
      {
        id: 75,
        pergunta: 'Qual era o nome do lugar onde os israelitas receberam os 10 mandamentos?',
        alternativas: ['Monte Tabor', 'Monte Sinai', 'Monte das Oliveiras', 'Monte Carmelo'],
        correta: 1
      },
      {
        id: 76,
        pergunta: 'Quantos capítulos tem o livro de Salmos?',
        alternativas: ['145', '150', '155', '160'],
        correta: 1
      },
      {
        id: 77,
        pergunta: 'Quem foi o autor do livro de Atos?',
        alternativas: ['Paulo', 'Lucas', 'João', 'Pedro'],
        correta: 1
      },
      {
        id: 78,
        pergunta: 'Qual era o nome do apóstolo que era pescador?',
        alternativas: ['Pedro e André', 'João e Tiago', 'Todos os acima', 'Nenhum'],
        correta: 2
      },
      {
        id: 79,
        pergunta: 'Quantos filhos teve Jacó?',
        alternativas: ['10', '11', '12', '13'],
        correta: 2
      },
      {
        id: 80,
        pergunta: 'Qual era o nome da filha de Jefté que foi oferecida em voto?',
        alternativas: ['Não tinha nome', 'Débora', 'Raquel', 'Miriã'],
        correta: 0
      },
      {
        id: 81,
        pergunta: 'Quem foi o profeta que profetizou durante o exílio na Babilônia?',
        alternativas: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
        correta: 3
      },
      {
        id: 82,
        pergunta: 'Qual era o nome do lugar onde Jesus foi tentado pelo diabo?',
        alternativas: ['Deserto de Judá', 'Deserto do Sinai', 'Deserto da Arábia', 'Deserto de Parã'],
        correta: 0
      },
      {
        id: 83,
        pergunta: 'Quantos dias ficou Jonas no ventre do peixe?',
        alternativas: ['1 dia', '2 dias', '3 dias', '4 dias'],
        correta: 2
      },
      {
        id: 84,
        pergunta: 'Qual era o nome do livro que vem depois de Jeremias?',
        alternativas: ['Ezequiel', 'Lamentações', 'Daniel', 'Oséias'],
        correta: 1
      },
      {
        id: 85,
        pergunta: 'Quem foi o primeiro mártir mencionado no livro de Atos?',
        alternativas: ['Estevão', 'Tiago', 'Pedro', 'Paulo'],
        correta: 0
      },
      {
        id: 86,
        pergunta: 'Quantos anos durou o dilúvio?',
        alternativas: ['30 dias', '40 dias', '150 dias', '1 ano'],
        correta: 2
      },
      {
        id: 87,
        pergunta: 'Qual era o nome do lugar onde Jesus fez a última ceia?',
        alternativas: ['Casa de Pedro', 'Casa de Maria', 'Cenáculo', 'Sinagoga'],
        correta: 2
      },
      {
        id: 88,
        pergunta: 'Quem foi o profeta que profetizou sobre o vale dos ossos secos?',
        alternativas: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
        correta: 2
      },
      {
        id: 89,
        pergunta: 'Quantos livros tem a Bíblia completa?',
        alternativas: ['64', '65', '66', '67'],
        correta: 2
      },
      {
        id: 90,
        pergunta: 'Qual era o nome do discípulo que era coletor de impostos?',
        alternativas: ['Pedro', 'Mateus', 'João', 'André'],
        correta: 1
      },
      {
        id: 91,
        pergunta: 'Quem foi o rei que construiu o primeiro templo?',
        alternativas: ['Davi', 'Salomão', 'Josias', 'Ezequias'],
        correta: 1
      },
      {
        id: 92,
        pergunta: 'Qual era o nome do lugar onde Jesus foi preso?',
        alternativas: ['Jardim do Getsêmani', 'Monte das Oliveiras', 'Cenáculo', 'Betânia'],
        correta: 0
      },
      {
        id: 93,
        pergunta: 'Quantas vezes Pedro negou Jesus?',
        alternativas: ['1', '2', '3', '4'],
        correta: 2
      },
      {
        id: 94,
        pergunta: 'Qual era o nome do livro que vem antes de Mateus?',
        alternativas: ['Não há', 'Malaquias', 'Zacarias', 'Ageu'],
        correta: 1
      },
      {
        id: 95,
        pergunta: 'Quem foi o autor do livro de Provérbios?',
        alternativas: ['Davi', 'Salomão', 'Ezequias', 'Moisés'],
        correta: 1
      },
      {
        id: 96,
        pergunta: 'Quantos anos viveu Adão?',
        alternativas: ['800', '900', '930', '950'],
        correta: 2
      },
      {
        id: 97,
        pergunta: 'Qual era o nome do lugar onde Jesus foi sepultado?',
        alternativas: ['Túmulo de José', 'Túmulo novo', 'Túmulo de Arimateia', 'Túmulo de Nicodemos'],
        correta: 2
      },
      {
        id: 98,
        pergunta: 'Quem foi o profeta que foi chamado de "profeta chorão"?',
        alternativas: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
        correta: 1
      },
      {
        id: 99,
        pergunta: 'Quantos dias Jesus apareceu após a ressurreição?',
        alternativas: ['30 dias', '40 dias', '50 dias', '60 dias'],
        correta: 1
      },
      {
        id: 100,
        pergunta: 'Qual era o nome do sumo sacerdote no Antigo Testamento que abençoou o povo?',
        alternativas: ['Eli', 'Samuel', 'Arão', 'Melquisedeque'],
        correta: 2
      }
    ]
  },

  // ===============================
  // NÍVEL 3 — DIFÍCIL (101–150)
  // ===============================
  {
    id: 3,
    nome: 'DIFÍCIL',
    perguntas: [
      {
        id: 101,
        pergunta: 'Quem foi o rei que escreveu grande parte de Provérbios?',
        alternativas: ['Davi', 'Salomão', 'Saul', 'Ezequias'],
        correta: 1
      },
      {
        id: 102,
        pergunta: 'Qual profeta foi levado ao céu em um redemoinho?',
        alternativas: ['Elias', 'Eliseu', 'Isaías', 'Jeremias'],
        correta: 0
      },
      {
        id: 103,
        pergunta: 'Quem reconstruiu os muros de Jerusalém?',
        alternativas: ['Esdras', 'Neemias', 'Zorobabel', 'Daniel'],
        correta: 1
      },
      {
        id: 104,
        pergunta: 'Qual livro fala sobre a mulher chamada Rute?',
        alternativas: ['Juízes', '1 Samuel', 'Rute', 'Ester'],
        correta: 2
      },
      {
        id: 105,
        pergunta: 'Quem escreveu a maioria das cartas do Novo Testamento?',
        alternativas: ['Pedro', 'João', 'Paulo', 'Lucas'],
        correta: 2
      },
      {
        id: 106,
        pergunta: 'Qual era o nome do lugar onde Moisés viu a sarça ardente?',
        alternativas: ['Monte Sinai', 'Monte Horebe', 'Monte Nebo', 'Monte Seir'],
        correta: 1
      },
      {
        id: 107,
        pergunta: 'Quantas vezes Jesus apareceu após sua ressurreição?',
        alternativas: ['7 vezes', '10 vezes', '11 vezes', 'Mais de 10 vezes'],
        correta: 3
      },
      {
        id: 108,
        pergunta: 'Qual era o nome do rei que leu a lei e fez uma grande reforma?',
        alternativas: ['Josias', 'Ezequias', 'Asa', 'Jeosafá'],
        correta: 0
      },
      {
        id: 109,
        pergunta: 'Quem foi o autor do livro de Eclesiastes?',
        alternativas: ['Davi', 'Salomão', 'Ezequias', 'Jeremias'],
        correta: 1
      },
      {
        id: 110,
        pergunta: 'Qual era o nome do sumo sacerdote que serviu durante o tempo de Jesus?',
        alternativas: ['Anás', 'Caifás', 'Herodes', 'Pilatos'],
        correta: 1
      },
      {
        id: 111,
        pergunta: 'Quantos livros compõem a Torá (Lei)?',
        alternativas: ['3', '4', '5', '6'],
        correta: 2
      },
      {
        id: 112,
        pergunta: 'Qual era o nome do profeta que profetizou sobre o templo sendo destruído?',
        alternativas: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
        correta: 1
      },
      {
        id: 113,
        pergunta: 'Quem foi o autor do livro de Tiago?',
        alternativas: ['Tiago, filho de Zebedeu', 'Tiago, filho de Alfeu', 'Tiago, irmão de Jesus', 'Tiago, o menor'],
        correta: 2
      },
      {
        id: 114,
        pergunta: 'Quantos anos durou o reinado de Davi?',
        alternativas: ['37 anos', '40 anos', '43 anos', '45 anos'],
        correta: 1
      },
      {
        id: 115,
        pergunta: 'Qual era o nome do lugar onde Jesus fez o Sermão da Montanha?',
        alternativas: ['Monte Tabor', 'Monte das Oliveiras', 'Monte Sinai', 'Não especificado'],
        correta: 3
      },
      {
        id: 116,
        pergunta: 'Quem foi o autor do livro de Judas?',
        alternativas: ['Judas Iscariotes', 'Judas, irmão de Tiago', 'Judas, filho de Tiago', 'Judas de Damasco'],
        correta: 1
      },
      {
        id: 117,
        pergunta: 'Qual era o nome do rei que teve um sonho interpretado por Daniel?',
        alternativas: ['Nabucodonosor', 'Belsazar', 'Dario', 'Ciro'],
        correta: 0
      },
      {
        id: 118,
        pergunta: 'Quantos capítulos tem o livro mais longo da Bíblia?',
        alternativas: ['145', '150', '176', '178'],
        correta: 2
      },
      {
        id: 119,
        pergunta: 'Qual era o nome do livro mais curto da Bíblia?',
        alternativas: ['2 João', '3 João', 'Obadias', 'Filemom'],
        correta: 1
      },
      {
        id: 120,
        pergunta: 'Quem foi o autor do livro de 1 e 2 Pedro?',
        alternativas: ['Pedro', 'Marcos ditado por Pedro', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 121,
        pergunta: 'Qual era o nome do lugar onde Jesus foi tentado a transformar pedras em pão?',
        alternativas: ['Deserto', 'Templo', 'Monte', 'Todas as opções'],
        correta: 3
      },
      {
        id: 122,
        pergunta: 'Quantos filhos teve Ló?',
        alternativas: ['2 filhas', '2 filhas e 2 filhos', 'Só filhas', 'Não especificado'],
        correta: 0
      },
      {
        id: 123,
        pergunta: 'Qual era o nome do profeta que casou com uma prostituta?',
        alternativas: ['Oséias', 'Amós', 'Miqueias', 'Naum'],
        correta: 0
      },
      {
        id: 124,
        pergunta: 'Quem foi o autor do livro de Apocalipse?',
        alternativas: ['João, o apóstolo', 'João, o presbítero', 'João Batista', 'Não especificado'],
        correta: 0
      },
      {
        id: 125,
        pergunta: 'Quantos anos tinha Noé quando morreu?',
        alternativas: ['900', '930', '950', '969'],
        correta: 3
      },
      {
        id: 126,
        pergunta: 'Qual era o nome do lugar onde os discípulos receberam o Espírito Santo?',
        alternativas: ['Cenáculo', 'Monte das Oliveiras', 'Templo', 'Sinagoga'],
        correta: 0
      },
      {
        id: 127,
        pergunta: 'Quem foi o autor do livro de 1 e 2 Timóteo?',
        alternativas: ['Paulo', 'Timóteo', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 128,
        pergunta: 'Qual era o nome do rei que deu ordem para reconstruir o templo?',
        alternativas: ['Nabucodonosor', 'Ciro', 'Dario', 'Artaxerxes'],
        correta: 1
      },
      {
        id: 129,
        pergunta: 'Quantos salmos foram atribuídos a Davi?',
        alternativas: ['70', '73', '75', '78'],
        correta: 1
      },
      {
        id: 130,
        pergunta: 'Qual era o nome do lugar onde Paulo foi cegado?',
        alternativas: ['Damasco', 'Jerusalém', 'Antioquia', 'Éfeso'],
        correta: 0
      },
      {
        id: 131,
        pergunta: 'Quem foi o autor do livro de Gálatas?',
        alternativas: ['Paulo', 'Pedro', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 132,
        pergunta: 'Quantos anos durou o reinado de Salomão antes da divisão?',
        alternativas: ['30 anos', '40 anos', '50 anos', '60 anos'],
        correta: 1
      },
      {
        id: 133,
        pergunta: 'Qual era o nome do profeta que foi chamado de "profeta menor"?',
        alternativas: ['Os 12 profetas menores', 'Ezequiel', 'Jeremias', 'Isaías'],
        correta: 0
      },
      {
        id: 134,
        pergunta: 'Quem foi o autor do livro de Colossenses?',
        alternativas: ['Paulo', 'Timóteo', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 135,
        pergunta: 'Qual era o nome do lugar onde Jesus curou o cego de nascença?',
        alternativas: ['Betesda', 'Jerusalém', 'Siloé', 'Cafarnaum'],
        correta: 1
      },
      {
        id: 136,
        pergunta: 'Quantos livros tem a seção de "Profetas Maiores"?',
        alternativas: ['3', '4', '5', '6'],
        correta: 2
      },
      {
        id: 137,
        pergunta: 'Qual era o nome do rei que teve a mão ressequida por tocar na arca?',
        alternativas: ['Uzá', 'Oza', 'Eli', 'Samuel'],
        correta: 0
      },
      {
        id: 138,
        pergunta: 'Quem foi o autor do livro de Filipenses?',
        alternativas: ['Paulo', 'Pedro', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 139,
        pergunta: 'Qual era o nome do lugar onde Jesus fez o milagre dos peixes?',
        alternativas: ['Mar da Galileia', 'Lago de Genesaré', 'Mar de Tiberíades', 'Todas as opções'],
        correta: 3
      },
      {
        id: 140,
        pergunta: 'Quantos anos viveu Matusalém?',
        alternativas: ['900', '930', '969', '980'],
        correta: 2
      },
      {
        id: 141,
        pergunta: 'Qual era o nome do profeta que profetizou sobre o vale da visão?',
        alternativas: ['Isaías', 'Jeremias', 'Ezequiel', 'Amós'],
        correta: 0
      },
      {
        id: 142,
        pergunta: 'Quem foi o autor do livro de Efésios?',
        alternativas: ['Paulo', 'Pedro', 'Lucas', 'João'],
        correta: 0
      },
      {
        id: 143,
        pergunta: 'Qual era o nome do lugar onde Jesus fez o milagre da água em vinho?',
        alternativas: ['Caná da Galileia', 'Betânia', 'Cafarnaum', 'Jerusalém'],
        correta: 0
      },
      {
        id: 144,
        pergunta: 'Quantos capítulos tem o livro mais curto do Antigo Testamento?',
        alternativas: ['1', '2', '3', '4'],
        correta: 0
      },
      {
        id: 145,
        pergunta: 'Qual era o nome do profeta que profetizou sobre Nínive?',
        alternativas: ['Jonas', 'Naum', 'Amós', 'Oséias'],
        correta: 1
      },
      {
        id: 146,
        pergunta: 'Quem foi o autor do livro de 1 e 2 Tessalonicenses?',
        alternativas: ['Paulo', 'Silas', 'Timóteo', 'Lucas'],
        correta: 0
      },
      {
        id: 147,
        pergunta: 'Qual era o nome do lugar onde Jesus ressuscitou?',
        alternativas: ['Jerusalém', 'Galiléia', 'Betânia', 'Não especificado'],
        correta: 0
      },
      {
        id: 148,
        pergunta: 'Quantos livros compõem os "Profetas Menores"?',
        alternativas: ['10', '11', '12', '13'],
        correta: 2
      },
      {
        id: 149,
        pergunta: 'Qual era o nome do rei que destruiu o templo de Jerusalém?',
        alternativas: ['Nabucodonosor', 'Belsazar', 'Ciro', 'Dario'],
        correta: 0
      },
      {
        id: 150,
        pergunta: 'Quem foi o autor do livro de Romanos?',
        alternativas: ['Paulo', 'Pedro', 'Lucas', 'João'],
        correta: 0
      }
    ]
  }
]


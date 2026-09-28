const COURSES = {
  assis: {
    slug: 'assis',
    city: 'Assis',
    state: 'SP',
    course: {
      title: 'Telhados e Estruturas em Aço Galvanizado',
      eyebrow: 'Curso presencial',
      subtitle: 'Aprenda o processo na prática — do planejamento e orçamento à montagem e ao acabamento de coberturas em aço galvanizado.',
      date: 'Em breve',
      time: 'A confirmar',
      duration: 'A confirmar',
      location: 'A confirmar',
      address: 'A confirmar',
      format: 'Presencial'
    },
    hero: {
      image: 'assets/images/assis/hero.jpg',
      alt: 'Profissional demonstrando uma estrutura durante uma formação prática.'
    },
    content: {
      marketTitle: 'Conhecimento técnico muda a forma como você trabalha.',
      marketIntro: 'Em uma formação presencial, você não fica limitado à teoria. O objetivo é compreender o processo, os materiais e as decisões que aparecem na rotina de uma obra.',
      problems: [
        ['01', 'Interpretar projetos', 'Entender informações técnicas e transformar desenho em execução.'],
        ['02', 'Calcular materiais', 'Organizar perfis, componentes e fixadores antes de iniciar a montagem.'],
        ['03', 'Executar com método', 'Compreender etapas, alinhamento, caimento e cuidados de montagem.'],
        ['04', 'Estruturar orçamentos', 'Conectar o conhecimento técnico às informações necessárias para uma proposta.']
      ],
      modules: [
        ['01', 'Preparo e ferramentas', 'Seleção de ferramentas, fixadores e preparação do canteiro para uma montagem organizada.'],
        ['02', 'Telhado embutido', 'Estruturas ocultas, caimento, posicionamento e detalhes de execução.'],
        ['03', 'Duas águas', 'Alinhamento, nivelamento e organização da estrutura para diferentes coberturas.'],
        ['04', 'Quatro águas e espigões', 'Geometria, cortes, encaixes e acabamento de testeiras e beirais.'],
        ['05', 'Grandes vãos e varandas', 'Organização estrutural para vencer vãos e construir soluções limpas.'],
        ['06', 'Telha termoacústica', 'Montagem, alinhamento, vedação e cuidados com painéis termoacústicos.']
      ],
      audience: [
        ['Profissionais da construção', 'Para quem quer ampliar o repertório técnico e trabalhar com aço galvanizado.'],
        ['Montadores e serralheiros', 'Para quem já atua com estruturas e quer aperfeiçoar processos de cobertura.'],
        ['Quem está entrando no segmento', 'Para quem busca uma formação presencial conectada à prática.'],
        ['Empreiteiros e líderes', 'Para quem precisa compreender melhor execução, materiais e orçamento.']
      ],
      faq: [
        ['Quem pode participar?', 'A formação é direcionada a profissionais da construção, montadores, serralheiros, empreiteiros e pessoas que desejam conhecer o processo de execução de coberturas em aço galvanizado.'],
        ['Preciso ter experiência?', 'A experiência prévia ajuda, mas o conteúdo pode ser acompanhado por quem está iniciando, desde que tenha interesse pela área de construção e disposição para aprender na prática.'],
        ['Onde será realizado?', 'A próxima turma ainda terá cidade e local confirmados. A equipe informará os detalhes assim que a nova agenda for definida.'],
        ['Qual a duração?', 'A duração e a programação serão informadas junto com os detalhes da próxima turma.'],
        ['O curso é presencial?', 'Sim. Esta página é dedicada à turma presencial da cidade selecionada.'],
        ['O curso fornece certificado?', '[INFORMAÇÃO SOBRE CERTIFICADO].'],
        ['O que está incluso?', '[INFORMAÇÕES SOBRE O QUE ESTÁ INCLUSO NA TURMA].'],
        ['Como funciona a inscrição?', 'Fale com a equipe pelo WhatsApp para consultar disponibilidade, condições e orientações para inscrição.']
      ]
    },
    instructor: {
      name: 'Paulo H. Farias',
      role: 'Instrutor e especialista em estruturas metálicas galvanizadas',
      image: 'assets/images/assis/IMG_0142.jpg',
      bio: 'Fundador da Nova Era Soluções em Telhados, com mais de 12 anos de experiência no canteiro de obras. O treinamento foi estruturado a partir de situações práticas de nível, caimento, prumo, montagem e acabamento encontradas em coberturas residenciais e comerciais.'
    },
    gallery: [
      { type: 'image', src: 'assets/images/assis/hero.jpg', alt: 'Formação prática em estrutura de cobertura.' }
    ],
    videos: [],
    testimonials: [],
    contact: {
      whatsapp: '5514981007450',
      message: 'Olá! Tenho interesse no curso presencial de Telhados e Estruturas em Aço Galvanizado. Gostaria de receber informações sobre as próximas turmas, datas e cidades.'
    },
    seo: {
      title: 'Curso de Telhados e Estruturas em Aço Galvanizado | Próximas Turmas',
      description: 'Conheça o curso presencial de Telhados e Estruturas em Aço Galvanizado. Consulte as próximas turmas, datas e cidades.',
      image: 'assets/images/assis/hero.jpg'
    }
  }
};


/*
 * Galeria geral das turmas.
 * A galeria é independente da cidade da página do curso para permitir
 * que o visitante veja todos os registros ou filtre por cidade.
 *
 * Para adicionar fotos de uma cidade, basta incluir novos itens em `items`
 * usando o caminho correspondente em assets/images/<slug-da-cidade>/.
 */
const CITY_GALLERIES = {
  assis: {
    slug: 'assis',
    city: 'Assis',
    state: 'SP',
    items: [
      { type: 'image', src: 'assets/images/assis/assis1.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis2.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis3.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis4.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis5.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis6.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis7.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis8.jpg', alt: 'Registro da formação presencial em Assis - SP.' },
      { type: 'image', src: 'assets/images/assis/assis9.jpg', alt: 'Registro da formação presencial em Assis - SP.' }
    ]
  },
  garca: {
    slug: 'garca',
    city: 'Garça',
    state: 'SP',
    items: [
      { type: 'image', src: 'assets/images/garca/01-ferramenta-parafusadeira.webp', alt: 'Detalhe da ferramenta utilizada durante a aula prática em Garça - SP.' },
      { type: 'image', src: 'assets/images/garca/02-equipe-pratica.webp', alt: 'Participantes da turma de Garça durante uma atividade prática.' },
      { type: 'image', src: 'assets/images/garca/03-montagem-estrutura.webp', alt: 'Participantes trabalhando na montagem de uma estrutura em aço galvanizado.' },
      { type: 'image', src: 'assets/images/garca/04-capacetes-e-epis.webp', alt: 'Capacetes e equipamentos de proteção utilizados pela turma.' },
      { type: 'image', src: 'assets/images/garca/05-medicao-pratica.webp', alt: 'Aluno realizando uma medição durante a prática de montagem.' },
      { type: 'image', src: 'assets/images/garca/06-execucao-estrutura.webp', alt: 'Participante executando uma etapa da estrutura durante a formação.' },
      { type: 'image', src: 'assets/images/garca/07-turma-em-pratica.webp', alt: 'Turma de Garça reunida durante uma atividade prática.' },
      { type: 'image', src: 'assets/images/garca/08-turma-completa.webp', alt: 'Registro da turma de Garça ao final da formação presencial.' },
      { type: 'image', src: 'assets/images/garca/09-medicao-perfil.webp', alt: 'Detalhe da conferência de medida em um perfil de aço galvanizado.' }
    ]
  }
};

const GALLERY_CITIES = Object.values(CITY_GALLERIES);

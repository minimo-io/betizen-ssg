const metadata = require("./metadata.js");

module.exports = {
  es: {
    dir: "", // stands for the direction of the language set in the head, defaults to LTR (left to right)
    menu: {
      class: "dropdown-item font-weight-bold flag-icon-background flag-icon-es",
      name: "Español",
      flagClass: "flag-icon-es",
    },
    promo: {
      url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
      cta: "👉 ¿Bono de $10 para probar?",
      image: metadata.images.banners + "casino-banner-3-es.webp",
      casino: {
        logo: "/assets/imgs/casinos/888starz-logo.webp",
        name: "888Starz",
        title: "200% SOBRE EL DEPÓSITO Y 150 GIROS 🤯 ¡PROMO LIMITADA!",
        cta: "¡RECLAMA TU BONO DE LA SUERTE HOY!",
      },
      external_250x250: metadata.images.banners + "banner_250x250-es.png",
    },
    categories: {
      slot: { name: "Tragamonedas", url: "/juegos/tragamonedas/" },
      bingo: { name: "Bingo", url: "/juegos/video-bingo/" },
      roulette: { name: "Ruleta", url: "/juegos/ruleta/" },
      blackjack: { name: "Blackjack", url: "/juegos/blackjack/" },
      instant: {
        name: "Premios instantáneos",
        url: "/juegos/premios-instantaneos/",
      },
      baccarat: { name: "Baccarat", url: "/juegos/baccarat/" },
      poker: { name: "Video poker", url: "/juegos/video-poker/" },
    },
    texts: {
      bad: "Malo",
      average: "Medio",
      good: "Bueno",
      readMore: "Ver más",
      readLess: "Ver menos",
      slot: "Tragamonedas",
      reputationText: "Reputación",
      reputation: {
        fair: "Justo",
        acceptable: "Aceptable",
        caution: "Precaución",
        dangerous: "Peligroso",
      },
      featured: "Destacado",
      visit: "Visitar",
      visitCasino: "Visitar casino",
      bonus: "Bono",
      tryBonus: "Reclame este bono",
      freePlay: "Jugar gratis",
      realPlay: "Jugar de verdad",
      addCasino: "Agregar casino",
      slogan: {
        firstLine: "Transparencia extrema en Apuestas En Línea 🧘‍♂️",
        secondLine:
          "¡Nuevas plataformas con sus bonos sin depósito, juegos con acumulados y programas de afiliados!",
      },
      latestGames: "Los últimos juegos",
      latestGamesTeaser:
        "¡Los últimos slots, bingos y juegos de mesa lanzados al mercado!",
      featuredProviders: "Proveedores destacados",
      featuredProvidersText:
        "Explora los mejores creadores juegos de tragamonedas, bingo y plinko",
      seeAll: "Ver todos",
      createdBy: "Creado por",
      home: "Inicio",
      games: "Juegos",
      promotionsAndPayments: "Promociones y pagos",
      customerSupport: "Atención al cliente",
      designAndUsability: "Diseño y usabilidad",
      affiliateProgram: "Programa de afiliados",
      license: "Licencias",
      casinos: "Casinos",
      bonuses: "Bonos",
      aboutUs: "Nosotros",
      glossary: "Glosario",
      providers: "Proveedores",
      provider: "Proveedor",
      affiliates: "Afiliados",
      others: "Otros",
      transparency: "Transparencia",
      rankings: "Rankings",
      ranking: "Ranking",
      volatility: "Volatilidad",
      minMaxBets: "Min/Max Bets",
      maxWin: "Ganancia max.",
      paylines: "Líneas de pago",
      hands: "Manos",
      type: "Tipo",
      maxWithdrawal: "Retiro máximo",
      minDeposit: "Depósito mínimo",
      minWithdrawal: "Retiro mínimo",
      category: "Categoría",
      launch: "Lanzamiento",
      details: {
        prizes: "Premios, RTP y volatilidad",
        functions: "Funciones y mecánica",
        theme: "Temática y diseño",
      },
      otherFreeGamesBy: "Otros juegos gratuitos de",
      moreAbout: "Más sobre",
      reputationDetails: "Detalles de la reputación",
      operatedBy: "Operado por",
      reviewOf: "Reseña de",
      rateOnInstagram: "¡Comente en Instagram!",
      questions: "¿Preguntas?",
      contactUs: "Contáctenos",
      founded: "Fundado",
      cookiesMessage:
        "Utilizamos cookies para mejorar su experiencia en Betizen, al continuar utilizando este sitio web, acepta dicho uso como se describe en nuestra pol\u00edtica de cookies.",
      accept: "Aceptar",
    },
  },
  "pt-br": {
    menu: {
      class: "dropdown-item flag-icon-background flag-icon-br",
      name: "Português",
      flagClass: "flag-icon-br",
    },
    promo: {
      url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
      cta: "👉 Bônus de R$65 para testar?",
      image: metadata.images.banners + "casino-banner-3-pt-br.webp",
      casino: {
        logo: "/assets/imgs/casinos/888starz-logo.webp",
        name: "888Starz",
        title: "200% NO DEPÓSITO E 150 GIROS GRATUITOS 🤯 PROMOÇÃO LIMITADA!",
        cta: "TENTE SUA SORTE AGORA!",
      },
      external_250x250: metadata.images.banners + "banner_250x250-pt-br.png",
    },
    categories: {
      slot: { name: "Caça níqueis", url: "/pt-br/jogos/caca-niqueis/" },
      instant: {
        name: "Prêmios imediatos",
        url: "/pt-br/jogos/premios-imediatos/",
      },
      bingo: { name: "Vídeo-Bingo", url: "/pt-br/jogos/video-bingo-pt/" },
      roulette: { name: "Roleta", url: "/pt-br/jogos/roleta/" },
      blackjack: { name: "Blackjack", url: "/pt-br/jogos/blackjack-br/" },

      baccarat: { name: "Baccarat", url: "/pt-br/jogos/baccarat-br/" },
      poker: { name: "Vídeo-Póker", url: "/pt-br/jogos/video-poker-pt/" },
    },
    texts: {
      bad: "Ruim",
      average: "Médio",
      good: "Bom",
      readMore: "Ver mais",
      readLess: "Ver menos",
      slot: "Caça-níqueis",
      reputationText: "Reputação",
      reputation: {
        fair: "Justo",
        acceptable: "Aceitável",
        caution: "Cuidado",
        dangerous: "Perigoso",
      },
      featured: "Destaque",
      visit: "Visitar",
      visitCasino: "Visitar cassino",
      bonus: "Bônus",
      tryBonus: "Obtenha este bônus",
      freePlay: "Jogar grátis",
      realPlay: "Jugar no casino",
      addCasino: "Adicionar cassino",
      slogan: {
        firstLine: "Transparência Extrema em Apostas Online 🧘‍♂️",
        secondLine:
          "Novas plataformas com seus bônus sem depósito, jogos com acumuladores e programas de afiliados!",
      },
      latestGames: "Os últimos jogos",
      latestGamesTeaser:
        "As últimas slots, bingos e jogos de mesa lançados no mercado!",
      featuredProviders: "Fornecedores em destaque",
      featuredProvidersText:
        "Explore os melhores criadores de jogos de slots, bingo e plinko",
      seeAll: "Ver todos",
      createdBy: "Criado por",
      home: "Início",
      games: "Jogos",
      promotionsAndPayments: "Promoções e pagamentos",
      customerSupport: "Atendimento ao cliente",
      designAndUsability: "Design e usabilidade",
      affiliateProgram: "Programa de Afiliados",
      license: "Licenças",
      casinos: "Cassinos",
      bonuses: "Bônus",
      aboutUs: "Sobre nós",
      glossary: "Glossário",
      providers: "Fornecedores",
      provider: "Fornecedor",
      affiliates: "Afiliados",
      others: "Outros",
      transparency: "Transparência",
      rankings: "Avaliações",
      ranking: "Avaliação",
      volatility: "Volatilidade",
      minMaxBets: "Min/Max",
      maxWin: "Ganho Máx.",
      paylines: "Linhas de pagamento",
      hands: "Mãos",
      type: "Tipo",
      maxWithdrawal: "Saque máximo",
      minDeposit: "Depósito mínimo",
      minWithdrawal: "Saque mínimo",
      category: "Categoria",
      launch: "Lançamento",
      details: {
        prizes: "Prêmios, RTP e volatilidade",
        functions: "Funções e mecânica",
        theme: "Tema e design",
      },
      otherFreeGamesBy: "Outros jogos grátis de",
      moreAbout: "Mais sobre",
      reputationDetails: "Detalhes da reputação",
      operatedBy: "Operado por",
      reviewOf: "Análise de",
      rateOnInstagram: "Avalie no Instagram!",
      questions: "Perguntas?",
      contactUs: "Entre em contato",
      founded: "Fundado",
      cookiesMessage:
        "Usamos cookies para melhorar a sua experiência no Betizen, ao continuar a usar este site, você aceita o uso conforme descrito em nossa política de cookies.",
      accept: "Aceitar",
    },
  },
  en: {
    menu: {
      class: "dropdown-item flag-icon-background flag-icon-gb",
      name: "English",
      flagClass: "flag-icon-gb",
    },
    promo: {
      url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
      cta: "👉 $10 bonus to try this out?",
      image: metadata.images.banners + "casino-banner-3-en.webp",
      casino: {
        logo: metadata.images.casinos + "888starz-logo.webp",
        name: "888Starz",
        title: "200% TO DEPOSIT AND 150 FS! 🤯 <br>CANNOT MISS THIS ONE!",
        cta: "CLAIM YOUR LUCKY BONUS TODAY!",
      },
      external_250x250: metadata.images.banners + "banner_250x250-en.png",
    },
    categories: {
      slot: { name: "Online Slots", url: "/en/games/free-slots/" },
      bingo: { name: "Online Bingo", url: "/en/games/online-bingo/" },
      roulette: { name: "Roulette", url: "/en/games/online-roulette/" },
    },
    texts: {
      bad: "Bad",
      average: "Average",
      good: "Good",
      readMore: "Read more",
      readLess: "Read less",
      slot: "Slots",
      reputationText: "Reputation",
      reputation: {
        fair: "Fair",
        acceptable: "Acceptable",
        caution: "Caution",
        dangerous: "Dangerous",
      },
      featured: "Featured",
      visit: "Visit",
      visitCasino: "Visit casino",
      bonus: "Bonus",
      tryBonus: "Claim this bonus",
      freePlay: "Play for free",
      realPlay: "Play in a casino",
      addCasino: "Include casino",
      slogan: {
        firstLine: "Extreme Transparency in Online Betting 🧘‍♂️",
        secondLine:
          "New platforms with their no deposit bonuses, jackpot games and affiliate programs!",
      },
      latestGames: "Latest Games",
      latestGamesTeaser:
        "The latest slots, bingos and table games launched on the market!",
      featuredProviders: "Featured Providers",
      featuredProvidersText:
        "Explore the best slots, bingo and plinko game creators",
      seeAll: "See All",
      createdBy: "Created by",
      home: "Home",
      games: "Games",
      promotionsAndPayments: "Promotions & Payments",
      customerSupport: "Customer Support",
      designAndUsability: "Design & Usability",
      affiliateProgram: "Affiliate Program",
      license: "Licenses",
      casinos: "Casinos",
      bonuses: "Bonuses",
      aboutUs: "About us",
      glossary: "Glossary",
      providers: "Providers",
      provider: "Provider",
      affiliates: "Affiliates",
      others: "Others",
      transparency: "Transparency",
      rankings: "Rankings",
      ranking: "Ranking",
      volatility: "Volatility",
      minMaxBets: "Min/Max Bets",
      maxWin: "Max Win",
      paylines: "Paylines",
      hands: "Hands",
      type: "Type",
      maxWithdrawal: "Max withdrawal",
      minDeposit: "Min deposit",
      minWithdrawal: "Min withdrawal",
      category: "Category",
      launch: "Launch",
      details: {
        prizes: "Prizes, RTP and Volatility",
        functions: "Functions and Mechanics",
        theme: "Theme and Design",
      },
      otherFreeGamesBy: "Other free games by",
      moreAbout: "More about",
      reputationDetails: "Reputation Details",
      operatedBy: "Operated by",
      reviewOf: "Review of",
      rateOnInstagram: "Rate on Instagram!",
      questions: "Questions?",
      contactUs: "Get in touch",
      founded: "Founded",
      cookiesMessage:
        "We use cookies to improve your site experience, by continuing to use this website you accept such use as outlined in our cookie policy.",
      accept: "Accept",
    },
  },
};

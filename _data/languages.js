const metadata = require("./metadata.js");

module.exports = {
  es: {
    footerNav: {
      blog: {
        name: "Blog",
        slug: "/blog/",
      },
      games: {
        name: "Juegos",
        slug: "/juegos/",
      },
    },
    dir: "", // stands for the direction of the language set in the head, defaults to LTR (left to right)
    menu: {
      name: "Español",
      flagClass: "flag-icon-es",
    },
    top: {
      text: "Agregar un sitio",
      url: "https://forms.gle/vMpnv4cFgccHYNp56",
    },
    promo: {
      url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
      cta: "👉 ¿100 GIROS GRATIS? AHORA!",
      image: metadata.images.banners + "national-es-1176x264.png",
      carrouselBonus: {
        image: "/assets/imgs/site/bonus-bg-1.webp",
        url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
        cta: "100% hasta $100 USD + 100 giros",
      },
      casino: {
        logo: "/assets/imgs/casinos/national-argentina-logo.webp",
        name: "National",
        title: "HASTA 100 GIROS GRÁTIS 🤯 ¡En National!",
        cta: "¡RECLAMA TUS 100 GIROS GRATIS 🤯 ¡En National!",
        url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
      },
      casino2: {
        logo: "/assets/imgs/casinos/axe-casino-logo.webp",
        name: "AxeCasino",
        title: "HASTA 300 GIROS GRÁTIS 🤯 ¡PROMO LIMITADA!",
        cta: "¡RECLAMA TUS 300 GIROS GRATIS HOY!",
        url: "https://axecasmedia.com/a8bc21b40",
      },
      external_250x250: metadata.images.banners + "banner_20bet_300x300.webp",
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
      or: "ó",
      close: "Cerrar",
      bad: "Malo",
      average: "Medio",
      good: "Bueno",
      positive: "Positivo",
      readMore: "Ver más",
      readLess: "Ver menos",
      slot: "Tragamonedas",
      loadMore: "Cargar mas",
      overallSentiment: "Sentimiento general",
      aiOverview: "Resumen de IA",
      back: "Volver",
      backToList: "Volver a la lista",
      changeBanner: "Cambiar banner",
      earn: "Gane",
      points: "karma",
      vote: "Votar",
      howWorks: "¿Cómo funciona?",

      orderNewer: "Mas nuevos",
      orderMostVoted: "Mas votados",
      orderAlphabetical: "Alfabético",
      orderLicensed: "Licenciados",
      orderBlacklisted: "Lista negra",
      orderShutdown: "Cerrados",

      gamesBy: "Juegos de",
      benefits: "Beneficios",
      search: "Buscar...",
      noItemToList: "Ningún item para listar.",
      spreadKarma: "¡Vamos a esparcir karma! 🤪",
      login: "Acceder",
      loginWithNostr: "Acceder con Nostr (NIP-07)",
      loginWithEmail: "Enviar código de acceso",
      logout: "Salir",
      news: "Noticias",
      quickInfo: "Quick Info",
      founded: "Fundado",
      headquarters: "Sede",
      officialSite: "Sitio oficial",
      welcome: "¡Bienvenido!",
      logoutMessage: "¡Adieeeu!",
      supporters: "Patrocinadores",

      reputationText: "Reputación",
      reputation: {
        fair: "Justo",
        acceptable: "Aceptable",
        caution: "Precaución",
        dangerous: "Peligroso",
      },
      tagline:
        "El primer sitio de listados de Casino, Binarias y Forex con los incentivos correctos",
      tagline2: "karma, mérito y proof-of-work",
      tagline3:
        "Transparencia extrema para usuarios, operadores y reguladores ;)",
      karma: {
        title: "¡Tu karma!",
        content: `
          <p>
            <strong>¿Qué es el karma?</strong> Karma es lo que mueve los rankings (¡y la vida!) Úsalo para votar e incidir en los rankings de sitios de casino, forex y opciones binarias, de forma que sólo las mejores marcas suban al top de los rankings, y solo los mejores usarios al Leaderboard. 
          </p>
          <br />
          <p>
            <strong>¿Cómo ganar karma?</strong> Todos los días ganas karma por acceder al sitio. Además gánalo comentando sobre tus experiencias con las marcas, también cuando otros usuários votan tus comentarios, consiguiendo seguidores o simplemente comprándolo con criptomonedas.
          </p>
          <br />
          <p>
            <strong>¿Cómo usar tu karma?</strong> El karma se utiliza accediendo a los listados de las marcas y haciendo click en las opciones 👍 ó 🖕. Cada voto aumenta o disminuye el karma de una marca en 21 puntos.
            Todos los votos son auditables y quedan registrado en el histórico de la marca (en el futuro en la blockchain). <strong>Con cada karma utilizado ganas 👑 Puntos de Liderazgo</strong>.
          </p>
          <div class="divider my-5"></div>
          <p>
            <strong>¿Eres una marca?</strong> Usa los puntos de karma para impulsar tu marca en las clasificaciones.
          </p>          
        `,
      },

      levels: {
        title: "Tu liderazgo",
        content: `
          <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
            <button class="btn btn-logout">Salir</button>
          </div>
          <p>
            <strong>¿Cómo ganar nivel?</strong> Ganas nivel cada vez que utilizas tu karma compartiendo tu experiencia sobre las marcas, votando, reseñando nuevos sitios y en general beneficiando a la comunidad.
          </p>
          <br />
          <p>
            <strong>¿Para qué ganar nivel?</strong> Como premio por haber beneficiado a la comunidad con sus acciones y karma, los usuários con mayor nivel en el leaderboard tienen acceso a bonos exclusivos VIP, giros gratuitos (sólo para líderes) y mayor influencia en la comunidad (sus comentário aparecen primeros, pueden promocionar sus propios sitios, redes y streamings, etc). 
          </p>  
          <div class="divider my-5"></div>
          <p>
            <strong>Accede a la lista completa de beneficios en la página "Nosotros".</strong>
          </p>                            
        `,
      },

      featured: "Destacado",
      visit: "Visitar",
      visitCasino: "Visitar casino",
      visitSite: "Visitar&nbsp;sitio",
      leaveOpinion: "Dejar opinión",
      detailsText: "Detalles",
      bonus: "Bono",
      tryBonus: "Reclame este bono",
      freePlay: "Jugar&nbsp;gratis",
      realPlay: "Jugar&nbsp;de&nbsp;verdad",
      addCasino: "Agregar casino",
      slogan: {
        firstLine: "Transparencia extrema en Apuestas En Línea 🧘‍♂️",
        secondLine:
          "¡Nuevas plataformas con sus bonos sin depósito, juegos con acumulados y programas de afiliados!",
      },
      protectingPlayersSince:
        "Protegiendo a los jugadores con tecnología transparente desde 2018",
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
      aboutUs: "F.A.Q",
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
      since: "Desde",
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
      code: "Código",
      bonusDetailsTitle: "Detalle de las condiciones del bono",
      binaryRegulation: "Regulación y Seguridad",
      binaryPlatform: "Plataforma de Negociación",
      binaryAssets: "Activos Disponibles",
      binaryFees: "Tasas y Comisiones",
      binaryPayments: "Depósitos y Retiros",
      binaryDemo: "Cuenta Demo",
      binarySupport: "Soporte al Cliente",
      binaryEducation: "Recursos Educativos",
      blacklistReason:
        "Aconsejamos encarecidamente no jugar en este casino debido a quejas no resueltas, malas prácticas u otros problemas graves.",
      supportersText:
        "Nada sustituye al poder del conocimiento colectivo, del mercado decidiendo. Betizen fomenta las buenas prácticas, luego los usuários deciden. ¡Ayudanos seguir mejorando el juego online!",
      becomeSponsor: "Sea patrocinador",
      soon: "En breve...",
      selectLanguage: "Selecciona un idioma",
    },
  },
  "pt-br": {
    footerNav: {
      blog: {
        name: "Blog",
        slug: "/pt-br/colunas/",
      },
      games: {
        name: "Jogos",
        slug: "/pt-br/jogos/",
      },
      // games: {
      //   text: "Juegos",
      //   url: "/juegos/",
      //   id: "term-id-4",
      //   children: buildGameCategoriesFromLanguage("es"),
      // },
    },
    menu: {
      name: "Português",
      flagClass: "flag-icon-br",
    },
    top: {
      text: "Adicionar um site",
      url: "https://forms.gle/vMpnv4cFgccHYNp56",
    },
    promo: {
      url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
      // url: "https://refpaiozdg.top/L?tag=d_4136349m_25437c_&site=4136349&ad=25437&r=registration",
      cta: "👉 QUER 150 RODADAS GRÁTIS?",
      image: metadata.images.banners + "national-pt-1176x264.png",
      carrouselBonus: {
        image: "/assets/imgs/site/bonus-bg-1.webp",
        url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
        cta: "100% até R$600 + 100 rodadas",
      },
      casino: {
        logo: metadata.images.casinos + "megapari-logo.webp",
        name: "MEGAPARI",
        title: "ATÉ 150 RODADAS GRÁTIS 🤯 PROMOÇÃO LIMITADA!",
        cta: "RECLAME SUAS 150 RODADAS GRÁTIS HOJE!",
        url: "https://refpazitag.top/L?tag=d_4136349m_25437c_&site=4136349&ad=25437",
      },
      external_250x250: metadata.images.banners + "banner_250x250-pt-br.webp",
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
      or: "ou",
      close: "Fechar",
      bad: "Ruim",
      average: "Médio",
      good: "Bom",
      positive: "Positivo",
      readMore: "Ver mais",
      readLess: "Ver menos",
      slot: "Caça-níqueis",
      loadMore: "Carregar mais",
      overallSentiment: "Sentimento geral",
      aiOverview: "Visão geral da IA",
      back: "Voltar",
      backToList: "Voltar à lista",
      changeBanner: "Trocar banner",
      earn: "Ganhe",
      points: "karma",
      vote: "Votar",
      howWorks: "Como funciona?",

      orderNewer: "Mas nuevos",
      orderMostVoted: "Mas votados",
      orderAlphabetical: "Alfabético",
      orderBlacklisted: "Lista negra",
      orderLicensed: "Licenciados",
      orderShutdown: "Fechados",

      benefits: "Benefícios",
      since: "Desde ",
      gamesBy: "Jogos de",
      search: "Procurar...",
      noItemToList: "Nenhum item para listar.",
      spreadKarma: "Vamos espalhar karma! 🤪",
      login: "Acessar",
      loginWithNostr: "Entrar com Nostr (NIP-07)",
      loginWithEmail: "Enviar código de acesso",
      logout: "Sair",
      news: "Notícias",
      quickInfo: "Informações rápidas",
      founded: "Fundado",
      headquarters: "Sede",
      officialSite: "Site oficial",
      welcome: "Seja bem-vindo!",
      logoutMessage: "Adieeeu!",
      supporters: "Apoiadores",

      reputationText: "Reputação",
      reputation: {
        fair: "Justo",
        acceptable: "Aceitável",
        caution: "Cuidado",
        dangerous: "Perigoso",
      },
      tagline:
        "O primeiro site de listagens de Casino, Binárias e Forex com os incentivos certos",
      tagline2: "karma, mérito e proof-of-work",
      tagline3:
        "Transparência extrema para usuários, operadores e reguladores ;)",
      karma: {
        title: "Seu karma!",
        content: `
          <p><strong>O que é o karma?</strong> Karma é o que move os rankings (e a vida!). Use-o para votar e influenciar os rankings de sites de cassino, forex e opções binárias, de forma que apenas as melhores marcas subam ao topo dos rankings, e apenas os melhores usuários ao Leaderboard.</p>
          <br />
          <p>
          <strong>Como ganhar karma?</strong> Todos os dias você ganha karma ao acessar o site. Além disso, ganhe comentando sobre suas experiências com as marcas, quando outros usuários votam nos seus comentários, conquistando seguidores ou simplesmente comprando com criptomoedas.
          </p>
          <br />
          <p>
            <strong>Como usar seu karma?</strong> O karma é usado acessando os listados das marcas e clicando nas opções 👍 ou 🖕. Cada voto aumenta ou diminui o karma de uma marca em 21 pontos.
            Todos os votos são auditáveis e registrados no histórico da marca (e no futuro na blockchain). 
            <strong>Com cada karma utilizado você ganha 👑 Pontos de Liderança</strong>
          </p>
          <div class="divider my-5"></div>
          <p>
            <strong>É uma marca?</strong> Use os pontos de karma para impulsionar sua marca nas classificações.
          </p>          
        `,
      },
      levels: {
        title: "Sua liderança",
        content: `
          <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
            <button class="btn btn-logout">Saír</button>
          </div>        
          <p>
            <strong>Como ganhar nível?</strong> Você ganha nível cada vez que utiliza seu karma compartilhando suas experiências com as marcas, votando, avaliando novos sites e, em geral, beneficiando a comunidade.
          </p>
          <br />
          <p>
            <strong>Para que serve ganhar nível?</strong> Como recompensa por ter beneficiado a comunidade com suas ações e karma, os usuários com maior nível no ranking têm acesso a bônus VIP exclusivos, giros gratuitos (apenas para líderes) e maior influência na comunidade (seus comentários aparecem primeiro, podem promover seus próprios sites, redes e streamings, etc).
          </p>  
          <div class="divider my-5"></div>
          <p>
            <strong>Acesse a lista completa de benefícios na página "Sobre nós".</strong>
          </p>                            
        `,
      },
      featured: "Destaque",
      visit: "Visitar",
      visitCasino: "Visitar cassino",
      visitSite: "Visitar&nbsp;site",
      leaveOpinion: "Dejar opinião",
      detailsText: "Detalhes",
      bonus: "Bônus",
      tryBonus: "Obtenha este bônus",
      freePlay: "Jogar&nbsp;grátis",
      realPlay: "Jogar&nbsp;no&nbsp;casino",
      addCasino: "Adicionar cassino",
      slogan: {
        firstLine: "Transparência Extrema em Apostas Online 🧘‍♂️",
        secondLine:
          "Novas plataformas com seus bônus sem depósito, jogos com acumuladores e programas de afiliados!",
      },
      protectingPlayersSince:
        "Protegendo os jogadores com tecnologia transparente desde 2018",
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
      aboutUs: "F.A.Q",
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
      code: "Código",
      bonusDetailsTitle: "Detalhes das condições do bônus",
      binaryRegulation: "Regulamentação e Segurança",
      binaryPlatform: "Plataforma de Negociação",
      binaryAssets: "Ativos Disponíveis",
      binaryFees: "Taxas e Comissões",
      binaryPayments: "Depósitos e Saques",
      binaryDemo: "Conta Demo",
      binarySupport: "Suporte ao Cliente",
      binaryEducation: "Recursos Educacionais",
      blacklistReason:
        "Aconselhamos fortemente que não jogue neste cassino devido a reclamações não resolvidas, más práticas ou outros problemas graves.",
      supportersText:
        "Nada substitui o poder do conhecimento coletivo, do mercado decidindo. A Betizen promove boas práticas, depois os usuários decidem. Ajude-nos a continuar melhorando o jogo online!",
      becomeSponsor: "Seja patrocinador",
      soon: "Em breve...",
      selectLanguage: "Selecione um idioma",
    },
  },
  en: {
    footerNav: {
      blog: {
        name: "Blog",
        slug: "/en/articles/",
      },
      games: {
        name: "Games",
        slug: "/en/games/",
      },
      // games: {
      //   text: "Juegos",
      //   url: "/juegos/",
      //   id: "term-id-4",
      //   children: buildGameCategoriesFromLanguage("es"),
      // },
    },
    menu: {
      name: "English",
      flagClass: "flag-icon-gb",
    },
    top: {
      text: "Get listed",
      url: "https://forms.gle/vMpnv4cFgccHYNp56",
    },
    promo: {
      url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
      cta: "👉 CLAIM 100 FREE SPINS?",
      image: metadata.images.banners + "national-en-1176x264.png",
      carrouselBonus: {
        image: "/assets/imgs/site/bonus-bg-1.webp",
        url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
        cta: "100% up to €100 + 100 free-spins",
      },
      casino: {
        logo: "/assets/imgs/casinos/national-argentina-logo.webp",
        name: "National",
        title: "UP TO 100 FREE SPINS 🤯 AT NATIONAL!",
        cta: "UP TO 100 FREE SPINS 🤯 AT NATIONAL!",
        url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
      },
      casino2: {
        logo: "/assets/imgs/casinos/axe-casino-logo.webp",
        name: "AxeCasino",
        title: "UP TO 150 FREE SPINS 🤯 LIMITED PROMOTION!",
        cta: "CLAIM YOUR 150 FREE SPINS TODAY!",
        url: "https://axecasmedia.com/a8bc21b40",
      },
      external_250x250: metadata.images.banners + "coinsgame-300x300.png",
    },
    categories: {
      slot: { name: "Online Slots", url: "/en/games/free-slots/" },
      bingo: { name: "Online Bingo", url: "/en/games/online-bingo/" },
      roulette: { name: "Roulette", url: "/en/games/online-roulette/" },
    },
    texts: {
      or: "or",
      close: "Close",
      bad: "Bad",
      average: "Average",
      good: "Good",
      positive: "Positive",
      readMore: "Read more",
      readLess: "Read less",
      slot: "Slots",
      loadMore: "Load more",
      overallSentiment: "Overall sentiment",
      aiOverview: "AI Overview",
      back: "Go back",
      backToList: "Go back to list",
      changeBanner: "Change banner",
      earn: "Earn",
      points: "karma",
      vote: "Vote",
      howWorks: "How does it work?",

      orderNewer: "Newest",
      orderMostVoted: "Most voted",
      orderAlphabetical: "Alphabetical",
      orderBlacklisted: "Blacklisted",
      orderLicensed: "Licensed",
      orderShutdown: "Shutdown",

      benefits: "Benefits",
      since: "Since",
      gamesBy: "Games by",
      search: "Search...",
      noItemToList: "No items to list.",
      spreadKarma: "Let's spread karma! 🤪",
      login: "Access",
      loginWithNostr: "Log in with Nostr (NIP-07)",
      loginWithEmail: "Send login code",
      logout: "Logout",
      news: "News",
      quickInfo: "Quick info",
      founded: "Founded",
      headquarters: "Headquarters",
      officialSite: "Official Website",
      welcome: "Welcome!",
      logoutMessage: "Adieeeu!",
      supporters: "Supporters",

      reputationText: "Reputation",
      reputation: {
        fair: "Fair",
        acceptable: "Acceptable",
        caution: "Caution",
        dangerous: "Dangerous",
      },
      tagline:
        "The first Casino, Binary & Forex listing site with the right incentives",
      tagline2: "karma, merit & proof-of-work",
      tagline3: "Extreme transparency for users, operators, and regulators ;)",
      karma: {
        title: "Your karma!",
        content: `
          <p><strong>What is karma?</strong> Karma is what drives rankings (and life!) Use it to vote and influence casino, forex, and binary options brands rankings, so only the bests rise to the top and only the best users make it to the Leaderboard.</p>
          <br />
          <p>
          <strong>How to earn karma?</strong> Every day you earn karma by visiting the site. You can also earn it by commenting on your experiences with brands, when other users vote on your comments, gaining followers, or simply buying it with cryptocurrencies.
          </p>
          <br />
          <p>
            <strong>How to use your karma?</strong> Karma is used by going to brand listings and clicking the 👍 or 🖕 options. Each vote increases or decreases a brand’s karma by 21 points.
            All karma votes are auditable and are recorded in the brand’s history.
            <strong>With each karma used you earn 👑 Leadership Points</strong>
          </p>
          <div class="divider my-5"></div>
          <p>
            <strong>Are you a brand?</strong> Use karma points to boost your brand in the rankings.
          </p>          
        `,
      },
      levels: {
        title: "Your leadership",
        content: `
          <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
            <button class="btn btn-logout">Logout</button>
          </div>        
          <p>
            <strong>How to gain level?</strong> You gain level every time you use your karma by sharing your experiences with brands, voting, reviewing new sites, and generally benefiting the community.
          </p>
          <br />
          <p>
            <strong>Why gain level?</strong> As a reward for benefiting the community with your actions and karma, users with higher levels on the leaderboard get access to exclusive VIP bonuses, free spins (leaders only), and greater influence in the community (their comments appear first, they can promote their own sites, networks, and streams, etc).
          </p>  
          <div class="divider my-5"></div>
          <p>
            <strong>Access the full list of benefits on the "About Us" page.</strong>
          </p>                            
        `,
      },
      featured: "Featured",
      visit: "Visit",
      visitCasino: "Visit casino",
      visitSite: "Visit&nbsp;site",
      leaveOpinion: "Leave opinion",
      detailsText: "Details",
      bonus: "Bonus",
      tryBonus: "Claim this bonus",
      freePlay: "Play&nbsp;for&nbsp;free",
      realPlay: "Play&nbsp;in&nbsp;casino",
      addCasino: "Include casino",
      slogan: {
        firstLine: "Extreme Transparency in Online Betting 🧘‍♂️",
        secondLine:
          "New platforms with their no deposit bonuses, jackpot games and affiliate programs!",
      },
      protectingPlayersSince:
        "Protecting players with transparent technology since 2018",
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
      aboutUs: "F.A.Q",
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
      code: "Code",
      bonusDetailsTitle: "Bonus Terms Details",
      binaryRegulation: "Regulation & Security",
      binaryPlatform: "Trading Platform",
      binaryAssets: "Available Assets",
      binaryFees: "Fees & Commissions",
      binaryPayments: "Deposits & Withdrawals",
      binaryDemo: "Demo Account",
      binarySupport: "Customer Support",
      binaryEducation: "Educational Resources",
      blacklistReason:
        "We strongly advise against playing at this casino due to unresolved complaints, poor practices, or other serious issues.",
      supportersText:
        "Nothing replaces the power of collective knowledge, of the market deciding. Betizen promotes good practices, then users decide. Help us keep improving online gaming!",
      becomeSponsor: "Become a sponsor",
      soon: "Soon...",
      selectLanguage: "Select a language",
    },
  },
};

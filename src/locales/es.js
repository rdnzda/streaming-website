// Spanish translation file for the application
export const es = {
  // Navigation
  navigation: {
    films: "Películas",
    series: "Series", 
    about: "Acerca de",
    popular: "Populares",
    topRated: "Mejor Valoradas",
    topRatedFeminine: "Mejor Valoradas",
    distribution: "Reparto"
  },

  // Home page
  home: {
    welcome: "Bienvenido.",
    subtitle: "Millones de películas y series para descubrir. Explora ahora.",
    trending: "Tendencias"
  },
  sections: {
    recentTrailers: "Trailers Recientes"
  },
  trailersFilters: {
    popular: 'Popular',
    streaming: 'Streaming',
    ontv: 'En TV',
    forrent: 'Para Alquilar',
    intheaters: 'En Cines'
  },

  // Pages titles
  pages: {
    popularMovies: "Películas Populares",
    topRatedMovies: "Películas Mejor Valoradas",
    popularSeries: "Series Populares", 
    topRatedSeries: "Series Mejor Valoradas"
  },

  // Filters
  filters: {
    popular: "Populares",
    topRated: "Mejor Valoradas",
    topRatedFeminine: "Mejor Valoradas",
    sort: "Ordenar",
    year: "Año", 
    minRating: "Puntuación mín.",
    reset: "Restablecer filtros",
    sortOptions: {
      popularityDesc: "Popularidad ↓",
      popularityAsc: "Popularidad ↑", 
      releaseDateDesc: "Fecha estreno ↓",
      releaseDateAsc: "Fecha estreno ↑",
      revenueDesc: "Ingresos ↓",
      revenueAsc: "Ingresos ↑",
      ratingDesc: "Puntuación ↓",
      ratingAsc: "Puntuación ↑",
      voteCountDesc: "Núm. votos ↓",
      voteCountAsc: "Núm. votos ↑"
    }
  },

  // Buttons and actions
  actions: {
    loadMore: "Cargar más",
    search: "Buscar",
    today: "Hoy",
    thisWeek: "Esta semana",
    goBack: "Volver"
  },

  // Error messages
  errors: {
    loadMovies: "Error al cargar películas...",
    loadSeries: "Error al cargar series...",
    apiError: "Error API TMDB",
    searchError: "Error de búsqueda",
    noResults: "No se encontraron resultados",
    loadingError: "Error de carga"
  },

  // Loading states
  loading: {
    movies: "Cargando películas...",
    series: "Cargando series...",
    search: "Buscando...",
    more: "Cargando más contenido..."
  },

  // Genres
  genres: {
    action: "Acción",
    adventure: "Aventura", 
    animation: "Animación",
    comedy: "Comedia",
    crime: "Crimen",
    drama: "Drama",
    fantasy: "Fantasía",
    horror: "Terror",
    romance: "Romance",
    sciFi: "Ciencia ficción",
    thriller: "Thriller",
    documentary: "Documental"
  },

  // Metadata
  meta: {
    rating: "Puntuación",
    releaseDate: "Fecha de estreno", 
    firstAirDate: "Primera emisión",
    overview: "Sinopsis",
    cast: "Reparto",
    director: "Director",
    producer: "Productor"
  },

  // Search placeholders
  search: {
    placeholder: "Buscar películas y series...",
    homePlaceholder: "Buscar películas, series, actores...",
    person: "Persona",
    film: "Película",
    seriesLabel: "Serie",
    searchPeoplePlaceholder: "Buscar un actor, director...",
    noResults: "Sin resultados"
  },

  // Footer
  footer: {
    createdBy: "Sitio creado por @rdnzda",
    sourceCode: "Código fuente disponible en GitHub",
    poweredBy: "Datos proporcionados por",
    links: {
      popularMovies: "Películas Populares",
      topMovies: "Top Películas", 
      popularSeries: "Series Populares",
      topSeries: "Top Series",
      about: "Acerca de"
    }
  },

  // Media details
  details: {
    synopsis: "Sinopsis",
    cast: "Reparto",
    directors: "Directores",
    countries: "Países de producción",
    seasons: "temporada(s)",
    votes: "votos",
    reviews: "Reseñas",
    noReviews: "No hay reseñas disponibles",
    readMore: "Leer más",
    readLess: "Leer menos",
    reviewBy: "Por",
    watchTrailer: "Ver trailer",
    viewCast: "Ver reparto"
  },

  // Advanced reviews system
  reviewsSystem: {
    filterBy: "Filtrar por",
    sortBy: "Ordenar por",
    showMore: "Ver más reseñas",
    showLess: "Ver menos reseñas",
    filters: {
      all: "Todas las reseñas",
      positive: "Reseñas positivas (6+)",
      negative: "Reseñas negativas (<6)"
    },
    sorts: {
      newest: "Más recientes",
      oldest: "Más antiguos", 
      rating_high: "Puntuación descendente",
      rating_low: "Puntuación ascendente"
    },
    stats: {
      total: "reseñas en total",
      showing: "Mostrando",
      of: "de"
    },
    noReviewsWithFilters: "Ninguna reseña con los filtros seleccionados"
  },

  // Página persona (actor / director)
  person: {
    biography: "Biografía",
    noBiography: "No hay biografía disponible",
    knownFor: "Conocido por",
    movies: "Películas",
    series: "Series",
    asCharacter: "como",
    asJob: "como"
  },

  // About page
  about: {
    title: "Acerca de",
    subtitle: "Tu destino de cine y series",
    mission: {
      title: "Nuestra Misión",
      description: "Creemos que cada historia merece ser descubierta. Nuestra plataforma te permite explorar un universo infinito de películas y series, desde blockbusters hasta joyas ocultas, incluyendo las creaciones más recientes."
    },
    features: {
      title: "¿Por qué elegirnos?",
      items: [
        {
          title: "Base de datos completa",
          description: "Accede a millones de películas y series con información detallada, calificaciones y reseñas."
        },
        {
          title: "Interfaz moderna",
          description: "Una experiencia de usuario fluida e intuitiva, optimizada para todos tus dispositivos."
        },
        {
          title: "Descubrimiento inteligente",
          description: "Encuentra tu próximo favorito a través de nuestras recomendaciones personalizadas."
        },
        {
          title: "Siempre actualizado",
          description: "Mantente informado sobre los últimos lanzamientos y tendencias del mundo del entretenimiento."
        }
      ]
    },
    technology: {
      title: "Tecnología",
      description: "Impulsado por la API de The Movie Database (TMDB), garantizamos datos confiables y actualizados en tiempo real."
    },
    team: {
      title: "El Equipo",
      description: "Desarrollado con pasión por amantes del cine y la tecnología, para ofrecer la mejor experiencia posible a los cinéfilos y seriéfilos."
    }
  }
};

export default es;

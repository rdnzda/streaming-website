// Fichier de traduction français pour l'application
export const fr = {
  // Navigation
  navigation: {
    films: "Films",
    series: "Séries", 
    about: "À Propos",
    popular: "Populaires",
    topRated: "Top Notés",
    topRatedFeminine: "Top Notées",
    distribution: "Distribution"
  },

  // Page d'accueil
  home: {
    welcome: "Bienvenue.",
    subtitle: "Des millions de films et séries à découvrir. Explorez maintenant.",
    trending: "En tendance"
  },
  sections: {
    recentTrailers: "Nouveaux Trailers"
  },
  trailersFilters: {
    popular: 'Populaire',
    streaming: 'Streaming',
    ontv: 'À la TV',
    forrent: 'À louer',
    intheaters: 'En salles'
  },

  // Pages titles
  pages: {
    popularMovies: "Films Populaires",
    topRatedMovies: "Films les Mieux Notés",
    popularSeries: "Séries Populaires", 
    topRatedSeries: "Séries les Mieux Notées"
  },

  // Filtres
  filters: {
    popular: "Populaires",
    topRated: "Top Notés",
    topRatedFeminine: "Top Notées"
  },

  // Page d'accueil
  home: {
    welcome: "Bienvenue.",
    subtitle: "Des millions de films et séries à découvrir. Explorez maintenant.",
    trending: "En tendance"
  },

  // Filtres
  filters: {
    sort: "Tri",
    year: "Année", 
    minRating: "Note min",
    reset: "Réinitialiser les filtres",
    sortOptions: {
      popularityDesc: "Popularité ↓",
      popularityAsc: "Popularité ↑", 
      releaseDateDesc: "Date sortie ↓",
      releaseDateAsc: "Date sortie ↑",
      revenueDesc: "Revenus ↓",
      revenueAsc: "Revenus ↑",
      ratingDesc: "Note ↓",
      ratingAsc: "Note ↑",
      voteCountDesc: "Nb votes ↓",
      voteCountAsc: "Nb votes ↑"
    }
  },

  // Boutons et actions
  actions: {
    loadMore: "Voir plus",
    search: "Rechercher",
    today: "Aujourd'hui",
    thisWeek: "Cette semaine",
    goBack: "Retour"
  },

  // Messages d'erreur
  errors: {
    loadMovies: "Impossible de charger les films...",
    loadSeries: "Impossible de charger les séries...",
    apiError: "Erreur API TMDB",
    searchError: "Erreur lors de la recherche",
    noResults: "Aucun résultat trouvé",
    loadingError: "Erreur lors du chargement"
  },

  // States de chargement
  loading: {
    movies: "Chargement des films...",
    series: "Chargement des séries...",
    search: "Recherche en cours...",
    more: "Chargement de plus de contenu..."
  },

  // Genres (pour référence)
  genres: {
    action: "Action",
    adventure: "Aventure", 
    animation: "Animation",
    comedy: "Comédie",
    crime: "Crime",
    drama: "Drame",
    fantasy: "Fantastique",
    horror: "Horreur",
    romance: "Romance",
    sciFi: "Sci-Fi",
    thriller: "Thriller",
    documentary: "Documentaire"
  },

  // Métadonnées
  meta: {
    rating: "Note",
    releaseDate: "Date de sortie", 
    firstAirDate: "Première diffusion",
    overview: "Synopsis",
    cast: "Distribution",
    director: "Réalisateur",
    producer: "Producteur"
  },

  // Search placeholders
  search: {
    placeholder: "Rechercher des films et séries...",
    homePlaceholder: "Rechercher des films, séries, acteurs...",
    person: "Personne",
    film: "Film",
    seriesLabel: "Série",
    searchPeoplePlaceholder: "Rechercher un acteur, réalisateur...",
    noResults: "Aucun résultat"
  },

  // Footer
  footer: {
    createdBy: "Site créé par @rdnzda",
    sourceCode: "Code source disponible sur GitHub",
    poweredBy: "Données fournies par",
    links: {
      popularMovies: "Films Populaires",
      topMovies: "Top Films", 
      popularSeries: "Séries Populaires",
      topSeries: "Top Séries",
      about: "À Propos"
    }
  },

  // Détails du média
  details: {
    synopsis: "Synopsis",
    cast: "Distribution",
    directors: "Réalisateurs",
    countries: "Pays de production",
    seasons: "saison(s)",
    votes: "votes",
    reviews: "Avis",
    noReviews: "Aucun avis disponible",
    readMore: "Lire plus",
    readLess: "Lire moins",
    reviewBy: "Par",
    watchTrailer: "Regarder le trailer",
    viewCast: "Voir la distribution"
  },

  // Système d'avis avancé
  reviewsSystem: {
    filterBy: "Filtrer par",
    sortBy: "Trier par",
    showMore: "Voir plus d'avis",
    showLess: "Voir moins d'avis",
    filters: {
      all: "Tous les avis",
      positive: "Avis positifs (6+)",
      negative: "Avis négatifs (<6)"
    },
    sorts: {
      newest: "Plus récents",
      oldest: "Plus anciens", 
      rating_high: "Note décroissante",
      rating_low: "Note croissante"
    },
    stats: {
      total: "avis au total",
      showing: "Affichage de",
      of: "sur"
    },
    noReviewsWithFilters: "Aucun avis avec les filtres sélectionnés"
  },

  // Page personne (acteur / réalisateur)
  person: {
    biography: "Biographie",
    noBiography: "Aucune biographie disponible",
    knownFor: "Connu pour",
    movies: "Films",
    series: "Séries",
    asCharacter: "en tant que",
    asJob: "en tant que"
  },

  // Page À propos
  about: {
    title: "À Propos",
    subtitle: "Votre destination cinéma et séries",
    mission: {
      title: "Notre Mission",
      description: "Nous croyons que chaque histoire mérite d'être découverte. Notre plateforme vous permet d'explorer un univers infini de films et de séries, des blockbusters aux pépites cachées, en passant par les créations les plus récentes."
    },
    features: {
      title: "Pourquoi nous choisir ?",
      items: [
        {
          title: "Base de données complète",
          description: "Accédez à des millions de films et séries avec des informations détaillées, notes et avis."
        },
        {
          title: "Interface moderne",
          description: "Une expérience utilisateur fluide et intuitive, optimisée pour tous vos appareils."
        },
        {
          title: "Découverte intelligente",
          description: "Trouvez votre prochain coup de cœur grâce à nos recommandations personnalisées."
        },
        {
          title: "Toujours à jour",
          description: "Restez informé des dernières sorties et tendances du monde du divertissement."
        }
      ]
    },
    technology: {
      title: "Technologie",
      description: "Propulsé par l'API The Movie Database (TMDB), nous vous garantissons des données fiables et actualisées en temps réel."
    },
    team: {
      title: "L'Équipe",
      description: "Développé avec passion par des amoureux du cinéma et de la technologie, pour offrir la meilleure expérience possible aux cinéphiles et sériephiles."
    }
  }
};

export default fr;

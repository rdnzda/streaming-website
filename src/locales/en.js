// English translation file for the application
export const en = {
  // Navigation
  navigation: {
    films: "Movies",
    series: "TV Shows", 
    about: "About",
    popular: "Popular",
    topRated: "Top Rated",
    topRatedFeminine: "Top Rated",
    distribution: "People"
  },

  // Home page
  home: {
    welcome: "Welcome.",
    subtitle: "Millions of movies and TV shows to discover. Explore now.",
    trending: "Trending"
  },
  sections: {
    recentTrailers: "Recent Trailers"
  },
  trailersFilters: {
    popular: 'Popular',
    streaming: 'Streaming',
    ontv: 'On TV',
    forrent: 'For Rent',
    intheaters: 'In Theaters'
  },

  // Pages titles
  pages: {
    popularMovies: "Popular Movies",
    topRatedMovies: "Top Rated Movies",
    popularSeries: "Popular TV Shows", 
    topRatedSeries: "Top Rated TV Shows"
  },

  // Filters
  filters: {
    popular: "Popular",
    topRated: "Top Rated",
    topRatedFeminine: "Top Rated",
    sort: "Sort",
    year: "Year", 
    minRating: "Min Rating",
    reset: "Reset filters",
    sortOptions: {
      popularityDesc: "Popularity ↓",
      popularityAsc: "Popularity ↑", 
      releaseDateDesc: "Release Date ↓",
      releaseDateAsc: "Release Date ↑",
      revenueDesc: "Revenue ↓",
      revenueAsc: "Revenue ↑",
      ratingDesc: "Rating ↓",
      ratingAsc: "Rating ↑",
      voteCountDesc: "Vote Count ↓",
      voteCountAsc: "Vote Count ↑"
    }
  },

  // Buttons and actions
  actions: {
    loadMore: "Load More",
    search: "Search",
    today: "Today",
    thisWeek: "This Week",
    goBack: "Go Back"
  },

  // Error messages
  errors: {
    loadMovies: "Failed to load movies...",
    loadSeries: "Failed to load TV shows...",
    apiError: "TMDB API Error",
    searchError: "Search error",
    noResults: "No results found",
    loadingError: "Loading error"
  },

  // Loading states
  loading: {
    movies: "Loading movies...",
    series: "Loading TV shows...",
    search: "Searching...",
    more: "Loading more content..."
  },

  // Genres (for reference)
  genres: {
    action: "Action",
    adventure: "Adventure", 
    animation: "Animation",
    comedy: "Comedy",
    crime: "Crime",
    drama: "Drama",
    fantasy: "Fantasy",
    horror: "Horror",
    romance: "Romance",
    sciFi: "Sci-Fi",
    thriller: "Thriller",
    documentary: "Documentary"
  },

  // Metadata
  meta: {
    rating: "Rating",
    releaseDate: "Release Date", 
    firstAirDate: "First Air Date",
    overview: "Overview",
    cast: "Cast",
    director: "Director",
    producer: "Producer"
  },

  // Search placeholders
  search: {
    placeholder: "Search for movies and TV shows...",
    homePlaceholder: "Search for movies, series, actors...",
    person: "Person",
    film: "Movie",
    seriesLabel: "TV Show",
    searchPeoplePlaceholder: "Search for an actor, director...",
    noResults: "No results"
  },

  // Footer
  footer: {
    createdBy: "Site created by @rdnzda",
    sourceCode: "Source code available on GitHub",
    poweredBy: "Data provided by",
    links: {
      popularMovies: "Popular Movies",
      topMovies: "Top Movies", 
      popularSeries: "Popular TV Shows",
      topSeries: "Top TV Shows",
      about: "About"
    }
  },

  // Media details
  details: {
    synopsis: "Synopsis",
    cast: "Cast",
    directors: "Directors",
    countries: "Production countries",
    seasons: "season(s)",
    votes: "votes",
    reviews: "Reviews",
    noReviews: "No reviews available",
    readMore: "Read more",
    readLess: "Read less",
    reviewBy: "By",
    watchTrailer: "Watch trailer",
    viewCast: "View cast"
  },

  // Advanced reviews system
  reviewsSystem: {
    filterBy: "Filter by",
    sortBy: "Sort by",
    showMore: "Show more reviews",
    showLess: "Show less reviews",
    filters: {
      all: "All reviews",
      positive: "Positive reviews (6+)",
      negative: "Negative reviews (<6)"
    },
    sorts: {
      newest: "Newest first",
      oldest: "Oldest first", 
      rating_high: "Highest rated",
      rating_low: "Lowest rated"
    },
    stats: {
      total: "reviews total",
      showing: "Showing",
      of: "of"
    },
    noReviewsWithFilters: "No reviews match the selected filters"
  },

  // Person page (actor / director)
  person: {
    biography: "Biography",
    noBiography: "No biography available",
    knownFor: "Known for",
    movies: "Movies",
    series: "TV Shows",
    asCharacter: "as",
    asJob: "as"
  },

  // About page
  about: {
    title: "About",
    subtitle: "Your cinema and series destination",
    mission: {
      title: "Our Mission",
      description: "We believe every story deserves to be discovered. Our platform allows you to explore an infinite universe of movies and series, from blockbusters to hidden gems, including the latest creations."
    },
    features: {
      title: "Why choose us?",
      items: [
        {
          title: "Complete database",
          description: "Access millions of movies and series with detailed information, ratings and reviews."
        },
        {
          title: "Modern interface",
          description: "A smooth and intuitive user experience, optimized for all your devices."
        },
        {
          title: "Smart discovery",
          description: "Find your next favorite through our personalized recommendations."
        },
        {
          title: "Always up to date",
          description: "Stay informed about the latest releases and trends in the entertainment world."
        }
      ]
    },
    technology: {
      title: "Technology",
      description: "Powered by The Movie Database (TMDB) API, we guarantee reliable and real-time updated data."
    },
    team: {
      title: "The Team",
      description: "Developed with passion by movie and technology lovers, to offer the best possible experience to movie and series enthusiasts."
    }
  }
};

export default en;

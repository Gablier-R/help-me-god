import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '32f0aa59d27600bb9918befc279679c6',
    language: 'pt-BR',
  },
});

const fetchTopTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top trending movies:', error);
    return [];
  }
};

const fetchTopRatedContent = async (contentType) => {
  try {
    const endpoint = contentType === 'movie' ? '/movie/top_rated' : '/tv/top_rated';
    const response = await api.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching top rated ${contentType}s:`, error);
    return [];
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, { params: { append_to_response: 'credits' } });
    const { id, title, backdrop_path, release_date, genres, overview } = response.data;
    const director = response.data.credits.crew.find((crew) => crew.job === 'Director');
    const cast = response.data.credits.cast.slice(0, 5);

    const movieGenres = genres.map((genre) => genre.name);

    return {
      id,
      title,
      backdrop_path,
      release_date,
      genres: movieGenres,
      director: director ? director.name : 'N/A',
      cast,
      overview,
    };
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
};

const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies by genre ${genreId}:`, error);
    return [];
  }
};

const fetchActorDetails = async (actorId) => {
  try {
    const response = await api.get(`/person/${actorId}`);
    const { id, name, profile_path, birthday, place_of_birth, biography } = response.data;

    return {
      id,
      name,
      profile_path,
      birthday,
      place_of_birth,
      biography,
    };
  } catch (error) {
    console.error(`Error fetching actor details for ID ${actorId}:`, error);
    return null;
  }
};

const fetchActorMoviesAndSeries = async (actorId) => {
  try {
    const [moviesResponse, seriesResponse] = await Promise.all([
      api.get(`/person/${actorId}/movie_credits`),
      api.get(`/person/${actorId}/tv_credits`),
    ]);

    const movies = moviesResponse.data.cast;
    const series = seriesResponse.data.cast;

    return { movies, series };
  } catch (error) {
    console.error(`Error fetching actor movies and series for ID ${actorId}:`, error);
    return { movies: [], series: [] };
  }
};

export {
  fetchTopTrendingMovies,
  fetchTopRatedContent, // Renomeada para refletir a generalização
  fetchMovieDetails,
  fetchActorDetails,
  fetchActorMoviesAndSeries,
  fetchMoviesByGenre
};

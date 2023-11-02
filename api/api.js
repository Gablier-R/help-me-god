// api.js
import axios from 'axios';

const TMDB_API_KEY = '32f0aa59d27600bb9918befc279679c6';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'pt-BR',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar dados: ${error}`);
    return [];
  }
};

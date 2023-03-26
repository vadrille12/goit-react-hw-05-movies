import axios from 'axios';

const API_KEY = 'f734f75889758ef929ab80a1a6b1d314';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function fetchMovies() {
  const response = await axios('trending/movie/day', {
    params: {
      api_key: API_KEY,
      size: 20,
    },
  });
  return response.data.results;
}

export async function fetchMoviesById(id) {
  const response = await axios(`movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
}

export async function fetchMoviesByName(query) {
  const response = await axios('search/movie', {
    params: {
      api_key: API_KEY,
      size: 20,
      query,
    },
  });

  return response.data.results;
}

export async function fetchMovieCast(id) {
  const response = await axios(`movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
}

export async function fetchMovieReviews(id) {
  const response = await axios(`movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
}

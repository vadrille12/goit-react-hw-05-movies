import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesById } from 'helpers/Api';

export const useFetchMovie = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMoviesById(movieId).then(setMovie);
  }, [movieId]);
  return movie;
};

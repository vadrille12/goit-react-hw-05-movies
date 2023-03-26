import { useEffect, useState, Suspense } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { fetchMovieCast } from 'helpers/Api';
import noPhoto from '../../img/noPhoto.jpg';
import s from './Cast.module.css';

const Cast = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieCast(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie !== null && movie.cast.length > 0 ? (
        <>
          <div className={s.CastCards}>
            {movie.cast.map(({ id, profile_path, name, character }) => (
              <div key={id} className={s.CastCard}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w300${profile_path}`
                      : noPhoto
                  }
                  alt={name}
                  width="150"
                />

                <p className={s.PHero}>{name}</p>
                <p className={s.P}>Character: {character} </p>
              </div>
            ))}
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <p>We don`t have iformation about cast of this movie.</p>
      )}
    </>
  );
};

export default Cast;

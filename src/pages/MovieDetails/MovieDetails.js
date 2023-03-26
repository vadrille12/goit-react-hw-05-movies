import { useFetchMovie } from 'hooks/useFetchMovie';
import { Suspense } from 'react';
import { useNavigate, useLocation, NavLink, Outlet } from 'react-router-dom';
import s from './MovieDetails.module.css';
const MovieDetails = () => {
  const movie = useFetchMovie();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div>
        <button
          onClick={() => navigate(location.state?.from ?? '/')}
          className={s.Button}
        >
          {'<'}= Go back
        </button>
      </div>
      {movie && (
        <>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path} `}
              alt={movie.title}
              width="300"
            />
            <div>
              <h1>{movie.title}</h1>
              <p>
                User Score: <span>{Math.round(movie.popularity) + '%'}</span>
              </p>
              <p>Overview</p>
              <p>{movie.overview}</p>
              <p>Genres</p>
              <ul>
                {movie.genres.map(name => {
                  return (
                    <li key={name.name}>
                      <p>{name.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <div className={s.AddInfo}>
              <NavLink to="cast" className={s.To}>
                Cast
              </NavLink>
              <NavLink to="reviews" className={s.To}>
                Reviews
              </NavLink>
            </div>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

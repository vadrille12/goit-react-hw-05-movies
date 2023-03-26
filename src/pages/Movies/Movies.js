import { fetchMoviesByName } from 'helpers/Api';
import { useEffect, useState, Suspense } from 'react';
import {
  useLocation,
  useSearchParams,
  Outlet,
  NavLink,
} from 'react-router-dom';

import s from './Movies.module.css';

const Movies = () => {
  const [searchMovieByWord, setSearchMovieByWord] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const movieName = searchParams.get('movieName');
  const location = useLocation();

  useEffect(() => {
    if (movieName !== '' && movieName !== null)
      fetchMoviesByName(movieName).then(data => {
        setSearchMovieByWord(data);
      });
  }, [movieName]);

  const handleButtonDisable = () => {
    setDisabled(!disabled);

    // if (condition) {

    // }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setSearchParams({ movieName: form.elements.movieName.value });
    form.reset();
    handleButtonDisable();
  };

  return (
    <>
      <main>
        <div className={s.Wrapper}>
          <form onSubmit={handleSubmit} className={s.Form}>
            <input
              type="text"
              name="movieName"
              onChange={handleButtonDisable}
              className={s.Input}
            />
            <button type="submit" disabled={!disabled} className={s.Button}>
              Search
            </button>
          </form>
          {searchMovieByWord.length > 0 && (
            <>
              <ul>
                {searchMovieByWord.map(({ title, id }) => (
                  <li key={id} className={s.Li}>
                    <NavLink
                      to={`/movies/${id}`}
                      state={{ from: location }}
                      className={s.NavLink}
                    >
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet />
              </Suspense>
            </>
          )}
          {searchMovieByWord.length === 0 && movieName !== null && (
            <p>No movie? Go to work, don't chill</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Movies;

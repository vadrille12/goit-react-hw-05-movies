import { useState, useEffect, Suspense } from 'react';
import { useLocation, NavLink, Outlet } from 'react-router-dom';
import { fetchMovies } from 'helpers/Api';
import s from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation;

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  return (
    <>
      <main>
        <div>
          <h1>Trending today</h1>
          <ul className={s.Ul}>
            {movies.map(({ title, id }) => (
              <li key={id} className={s.Li}>
                <NavLink
                  className={s.NavLink}
                  to={`/movies/${id}`}
                  state={{ from: location }}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Home;

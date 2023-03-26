import { Outlet, NavLink } from 'react-router-dom';
import s from './Layout.module.css';
const Layout = () => {
  return (
    <>
      <header className={s.Header}>
        <div className={s.HeaderWrapper}>
          <nav className={s.Nav}>
            <NavLink className={s.NavLink} to="/">
              Home
            </NavLink>
            <NavLink className={s.NavLink} to="/movies">
              Movies
            </NavLink>
          </nav>
        </div>
      </header>
      <div className={s.LayoutWrapper}>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;

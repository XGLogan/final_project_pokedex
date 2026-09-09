import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ favoritesCount }) {
  function buildLinkClassName({ isActive }) {
    return `navigation__link ${isActive ? 'navigation__link_active' : ''}`;
  }

  return (
    <nav className="navigation" aria-label="Main navigation">
      <NavLink to="/" end className={buildLinkClassName}>
        Home
      </NavLink>
      <NavLink
        to="/favorites"
        className={buildLinkClassName}
        aria-label={favoritesCount > 0 ? `Favorites, ${favoritesCount} saved` : 'Favorites'}
      >
        Favorites
        {favoritesCount > 0 && (
          <span className="navigation__badge" aria-hidden="true">
            {favoritesCount}
          </span>
        )}
      </NavLink>
      <NavLink to="/about" className={buildLinkClassName}>
        About
      </NavLink>
    </nav>
  );
}

export default Navigation;

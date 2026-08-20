import { NavLink } from 'react-router-dom';
import logo from '../../images/pokeball.svg';
import './Header.css';

function Header({ favoritesCount }) {
  function buildLinkClassName({ isActive }) {
    return `header__link ${isActive ? 'header__link_active' : ''}`;
  }

  return (
    <header className="header">
      <div className="header__container container">
        <NavLink to="/" className="header__brand">
          <img src={logo} alt="" aria-hidden="true" className="header__logo" />
          <span className="header__title">Pokédex Explorer</span>
        </NavLink>
        <nav className="header__nav" aria-label="Main navigation">
          <NavLink to="/" end className={buildLinkClassName}>
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={buildLinkClassName}
            aria-label={
              favoritesCount > 0 ? `Favorites, ${favoritesCount} saved` : 'Favorites'
            }
          >
            Favorites
            {favoritesCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {favoritesCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/about" className={buildLinkClassName}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;

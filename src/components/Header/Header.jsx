import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/pokeball.svg';
import './Header.css';

function Header({
  favoritesCount,
  isLoggedIn,
  currentUser,
  onSignInClick,
  onSignUpClick,
  onSignOut,
}) {
  return (
    <header className="header">
      <div className="header__container container">
        <NavLink to="/" className="header__brand">
          <img src={logo} alt="" aria-hidden="true" className="header__logo" />
          <span className="header__title">Pokédex Explorer</span>
        </NavLink>

        <Navigation favoritesCount={favoritesCount} />

        <div className="header__auth">
          {isLoggedIn ? (
            <>
              <span className="header__greeting">Hi, {currentUser.name}</span>
              <button
                type="button"
                className="header__auth-button header__auth-button_outline"
                onClick={onSignOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-button header__auth-button_outline"
                onClick={onSignInClick}
              >
                Sign in
              </button>
              <button
                type="button"
                className="header__auth-button header__auth-button_solid"
                onClick={onSignUpClick}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

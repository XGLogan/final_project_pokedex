import { Link } from 'react-router-dom';
import CardList from '../CardList/CardList';
import { EMPTY_STATE_MESSAGES } from '../../utils/constants';
import './Favorites.css';

function Favorites({ favorites, onCardClick, isFavorite, onToggleFavorite }) {
  const hasFavorites = favorites.length > 0;

  return (
    <section className="favorites">
      <div className="favorites__container container">
        <h1 className="favorites__title">Your favorite Pokémon</h1>

        {hasFavorites ? (
          <>
            <p className="favorites__count">
              {favorites.length} saved Pokémon
            </p>
            <CardList
              pokemons={favorites}
              onCardClick={onCardClick}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </>
        ) : (
          <div className="favorites__empty">
            <p className="favorites__empty-text">{EMPTY_STATE_MESSAGES.NO_FAVORITES}</p>
            <Link to="/" className="favorites__empty-link button">
              Browse Pokémon
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Favorites;

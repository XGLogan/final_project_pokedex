import { memo } from 'react';
import { capitalize, formatId, formatName } from '../../utils/pokemon';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from '../../utils/constants';
import heartIcon from '../../images/heart.svg';
import heartFilledIcon from '../../images/heart-filled.svg';
import placeholderImage from '../../images/pokeball.svg';
import './Card.css';

// `isFavorite` is a plain boolean so memo() only re-renders the card whose
// saved state actually changed.
function Card({ pokemon, onCardClick, isFavorite, onToggleFavorite }) {
  function handleOpen() {
    onCardClick(pokemon);
  }

  function handleToggleFavorite() {
    onToggleFavorite(pokemon);
  }

  function handleImageError(event) {
    if (event.target.src !== placeholderImage) {
      event.target.src = placeholderImage;
    }
  }

  return (
    <li className="card">
      <article className="card__inner">
        <button
          type="button"
          className={`card__favorite ${isFavorite ? 'card__favorite_active' : ''}`}
          onClick={handleToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${formatName(pokemon.name)} from favorites`
              : `Add ${formatName(pokemon.name)} to favorites`
          }
        >
          <img
            src={isFavorite ? heartFilledIcon : heartIcon}
            alt=""
            aria-hidden="true"
            className="card__favorite-icon"
          />
        </button>

        <button
          type="button"
          className="card__open"
          onClick={handleOpen}
          aria-label={`View details for ${formatName(pokemon.name)}`}
        >
          <span className="card__id">{formatId(pokemon.id)}</span>
          <img
            className="card__image"
            src={pokemon.imageUrl || placeholderImage}
            onError={handleImageError}
            alt={`${formatName(pokemon.name)} artwork`}
            width="180"
            height="180"
            loading="lazy"
          />
          <span className="card__title">{formatName(pokemon.name)}</span>
        </button>

        <ul className="card__types">
          {pokemon.types.map((type) => (
            <li
              key={type}
              className="card__type"
              style={{ backgroundColor: TYPE_COLORS[type] || DEFAULT_TYPE_COLOR }}
            >
              {capitalize(type)}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

export default memo(Card);

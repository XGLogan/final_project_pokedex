import { memo } from 'react';
import { capitalize, formatId, formatName } from '../../utils/pokemon';
import { TYPE_COLORS } from '../../utils/constants';
import heartIcon from '../../images/heart.svg';
import heartFilledIcon from '../../images/heart-filled.svg';
import placeholderImage from '../../images/pokeball.svg';
import './Card.css';

function Card({ pokemon, onCardClick, isFavorite, onToggleFavorite }) {
  const favorite = isFavorite(pokemon.id);

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
          className={`card__favorite ${favorite ? 'card__favorite_active' : ''}`}
          onClick={handleToggleFavorite}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remove ${formatName(pokemon.name)} from favorites`
              : `Add ${formatName(pokemon.name)} to favorites`
          }
        >
          <img
            src={favorite ? heartFilledIcon : heartIcon}
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
              style={{ backgroundColor: TYPE_COLORS[type] || 'var(--color-text-muted)' }}
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

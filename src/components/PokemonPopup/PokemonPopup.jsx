import { useEffect, useRef } from 'react';
import {
  DEFAULT_ACCENT_COLOR,
  DEFAULT_TYPE_COLOR,
  MAX_STAT_VALUE,
  STAT_LABELS,
  TYPE_COLORS,
} from '../../utils/constants';
import { capitalize, formatId, formatName } from '../../utils/pokemon';
import closeIcon from '../../images/close.svg';
import heartIcon from '../../images/heart.svg';
import heartFilledIcon from '../../images/heart-filled.svg';
import placeholderImage from '../../images/pokeball.svg';
import './PokemonPopup.css';

function PokemonPopup({
  pokemon,
  forms,
  error,
  isEscDisabled,
  onSelectForm,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const isOpen = Boolean(pokemon);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // While open: close on Escape (unless another modal is stacked on top),
  // move focus into the dialog, and restore focus to the trigger on close.
  // The keydown listener is removed on cleanup.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function handleEscClose(event) {
      if (event.key === 'Escape' && !isEscDisabled) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, isEscDisabled]);

  if (!pokemon) {
    return null;
  }

  const isSaved = isFavorite(pokemon.id);
  const primaryType = pokemon.types[0];
  const primaryColor = TYPE_COLORS[primaryType] || DEFAULT_ACCENT_COLOR;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
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
    <div className="popup" onClick={handleOverlayClick}>
      <div
        className="popup__container"
        role="dialog"
        aria-modal="true"
        aria-label={`${formatName(pokemon.name)} details`}
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Close popup"
          ref={closeButtonRef}
        >
          <img src={closeIcon} alt="" aria-hidden="true" className="popup__close-icon" />
        </button>

        <div
          className="popup__header"
          style={{ background: `linear-gradient(160deg, ${primaryColor} 0%, var(--color-surface) 130%)` }}
        >
          <span className="popup__id">{formatId(pokemon.id)}</span>
          <img
            className="popup__image"
            src={pokemon.imageUrl || placeholderImage}
            onError={handleImageError}
            alt={`${formatName(pokemon.name)} artwork`}
            width="200"
            height="200"
          />
          <h2 className="popup__title">{formatName(pokemon.name)}</h2>
          <ul className="popup__types">
            {pokemon.types.map((type) => (
              <li
                key={type}
                className="popup__type"
                style={{ backgroundColor: TYPE_COLORS[type] || DEFAULT_TYPE_COLOR }}
              >
                {capitalize(type)}
              </li>
            ))}
          </ul>

          {forms.length > 1 && (
            <div className="popup__forms" role="group" aria-label="Choose a form">
              {forms.map((form) => (
                <button
                  key={form.name}
                  type="button"
                  className={`popup__form ${
                    form.name === pokemon.name ? 'popup__form_active' : ''
                  }`}
                  onClick={() => onSelectForm(form.name)}
                  aria-pressed={form.name === pokemon.name}
                >
                  {form.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="popup__content">
          {error && (
            <p className="popup__error" role="alert">
              {error}
            </p>
          )}

          <ul className="popup__meta">
            <li className="popup__meta-item">
              <span className="popup__meta-label">Height</span>
              <span className="popup__meta-value">{pokemon.heightInMeters} m</span>
            </li>
            <li className="popup__meta-item">
              <span className="popup__meta-label">Weight</span>
              <span className="popup__meta-value">{pokemon.weightInKilograms} kg</span>
            </li>
          </ul>

          <section className="popup__section">
            <h3 className="popup__subtitle">Abilities</h3>
            <ul className="popup__abilities">
              {pokemon.abilities.map((ability) => (
                <li key={ability} className="popup__ability">
                  {formatName(ability)}
                </li>
              ))}
            </ul>
          </section>

          <section className="popup__section">
            <h3 className="popup__subtitle">Base stats</h3>
            <ul className="popup__stats">
              {pokemon.stats.map((stat) => (
                <li key={stat.name} className="popup__stat">
                  <span className="popup__stat-label">
                    {STAT_LABELS[stat.name] || stat.name}
                  </span>
                  <span className="popup__stat-value">{stat.value}</span>
                  <span className="popup__stat-track">
                    <span
                      className="popup__stat-fill"
                      style={{
                        width: `${Math.min((stat.value / MAX_STAT_VALUE) * 100, 100)}%`,
                        backgroundColor: primaryColor,
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            className={`popup__favorite ${isSaved ? 'popup__favorite_active' : ''}`}
            onClick={handleToggleFavorite}
            aria-pressed={isSaved}
          >
            <img
              src={isSaved ? heartFilledIcon : heartIcon}
              alt=""
              aria-hidden="true"
              className="popup__favorite-icon"
            />
            {isSaved ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonPopup;

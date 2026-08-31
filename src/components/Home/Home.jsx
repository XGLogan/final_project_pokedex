import SearchForm from '../SearchForm/SearchForm';
import CardList from '../CardList/CardList';
import Preloader from '../Preloader/Preloader';
import { capitalize } from '../../utils/pokemon';
import { EMPTY_STATE_MESSAGES, VIEW_MODES } from '../../utils/constants';
import './Home.css';

function Home({
  pokemons,
  isLoading,
  errorMessage,
  typesError,
  hasMore,
  mode,
  searchTerm,
  searchQuery,
  activeType,
  types,
  onSearchTermChange,
  onSearch,
  onClearSearch,
  onSelectType,
  onLoadMore,
  onCardClick,
  isFavorite,
  onToggleFavorite,
}) {
  const isFiltered = mode !== VIEW_MODES.BROWSE;
  const showEmptyState = !isLoading && !errorMessage && pokemons.length === 0;
  const showLoadMore = mode !== VIEW_MODES.SEARCH && hasMore && !isLoading && !errorMessage;

  let resultsLabel = '';
  if (mode === VIEW_MODES.SEARCH && searchQuery) {
    resultsLabel = `Results for “${searchQuery}”`;
  } else if (mode === VIEW_MODES.TYPE && activeType) {
    resultsLabel = `Type: ${capitalize(activeType)}`;
  }

  return (
    <>
      <section className="hero">
        <div className="hero__container container">
          <h1 className="hero__title">Explore the world of Pokémon</h1>
          <p className="hero__subtitle">
            Search by name or number, filter by type, and save your favorites.
          </p>
          <SearchForm
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            onSelectType={onSelectType}
            types={types}
            activeType={activeType}
          />
          {typesError && <p className="hero__notice">{typesError}</p>}
        </div>
      </section>

      <section className="results" aria-label="Pokémon results">
        <div className="results__container container">
          {isFiltered && resultsLabel && (
            <div className="results__header">
              <h2 className="results__title">{resultsLabel}</h2>
              <button type="button" className="results__clear" onClick={onClearSearch}>
                Clear
              </button>
            </div>
          )}

          {errorMessage && (
            <p className="results__message results__message_error" role="alert">
              {errorMessage}
            </p>
          )}

          {showEmptyState && (
            <p className="results__message">{EMPTY_STATE_MESSAGES.NO_RESULTS}</p>
          )}

          {pokemons.length > 0 && (
            <CardList
              pokemons={pokemons}
              onCardClick={onCardClick}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          )}

          {isLoading && <Preloader />}

          {showLoadMore && (
            <div className="results__actions">
              <button
                type="button"
                className="results__load-more button"
                onClick={onLoadMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;

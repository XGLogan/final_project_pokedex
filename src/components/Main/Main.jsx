import SearchForm from '../SearchForm/SearchForm';
import CardList from '../CardList/CardList';
import Preloader from '../Preloader/Preloader';
import { capitalize } from '../../utils/pokemon';
import { EMPTY_STATE_MESSAGES, GENERATIONS, VIEW_MODES } from '../../utils/constants';
import './Main.css';

function Main({
  pokemons,
  isLoading,
  errorMessage,
  typesError,
  hasMore,
  mode,
  searchTerm,
  searchQuery,
  activeType,
  activeGeneration,
  types,
  onSearchTermChange,
  onSearch,
  onClearSearch,
  onSelectType,
  onSelectGeneration,
  onLoadMore,
  onCardClick,
  isFavorite,
  onToggleFavorite,
}) {
  const isFiltered = mode !== VIEW_MODES.BROWSE;
  const showEmptyState = !isLoading && !errorMessage && pokemons.length === 0;
  // Stays visible after a failed page so the user can retry it.
  const showLoadMore = hasMore && !isLoading;

  let resultsLabel = '';
  if (mode === VIEW_MODES.SEARCH && searchQuery) {
    resultsLabel = `Results for “${searchQuery}”`;
  } else if (mode === VIEW_MODES.TYPE && activeType) {
    resultsLabel = `Type: ${capitalize(activeType)}`;
  } else if (mode === VIEW_MODES.GENERATION && activeGeneration) {
    const generation = GENERATIONS.find((item) => String(item.id) === activeGeneration);
    resultsLabel = generation ? generation.label : '';
  }

  return (
    <>
      <section className="hero">
        <div className="hero__container container">
          <h1 className="hero__title">Explore the world of Pokémon</h1>
          <p className="hero__subtitle">
            Search by name or number, filter by type or generation, and save your favorites.
          </p>
          <SearchForm
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            onSelectType={onSelectType}
            onSelectGeneration={onSelectGeneration}
            types={types}
            activeType={activeType}
            activeGeneration={activeGeneration}
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

export default Main;

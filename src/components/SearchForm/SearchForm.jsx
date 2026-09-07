import { capitalize } from '../../utils/pokemon';
import { GENERATIONS } from '../../utils/constants';
import searchIcon from '../../images/search.svg';
import closeIcon from '../../images/close.svg';
import './SearchForm.css';

function SearchForm({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClearSearch,
  onSelectType,
  onSelectGeneration,
  types,
  activeType,
  activeGeneration,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  function handleChange(event) {
    onSearchTermChange(event.target.value);
  }

  function handleClear() {
    onClearSearch();
  }

  function handleTypeChange(event) {
    onSelectType(event.target.value);
  }

  function handleGenerationChange(event) {
    onSelectGeneration(event.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__field">
        <img src={searchIcon} alt="" aria-hidden="true" className="search-form__icon" />
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Search by name or number…"
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search Pokémon by name or number"
          required
        />
        {searchTerm && (
          <button
            type="button"
            className="search-form__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <img src={closeIcon} alt="" aria-hidden="true" className="search-form__clear-icon" />
          </button>
        )}
        <button className="search-form__submit" type="submit">
          Search
        </button>
      </div>

      <div className="search-form__filters">
        <label className="search-form__filter">
          <span className="search-form__filter-label">Type</span>
          <select
            className="search-form__select"
            value={activeType}
            onChange={handleTypeChange}
          >
            <option value="">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {capitalize(type)}
              </option>
            ))}
          </select>
        </label>

        <label className="search-form__filter">
          <span className="search-form__filter-label">Generation</span>
          <select
            className="search-form__select"
            value={activeGeneration}
            onChange={handleGenerationChange}
          >
            <option value="">All generations</option>
            {GENERATIONS.map((generation) => (
              <option key={generation.id} value={String(generation.id)}>
                {generation.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
}

export default SearchForm;

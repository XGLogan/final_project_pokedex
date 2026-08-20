import { capitalize } from '../../utils/pokemon';
import searchIcon from '../../images/search.svg';
import closeIcon from '../../images/close.svg';
import './SearchForm.css';

function SearchForm({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClearSearch,
  onSelectType,
  types,
  activeType,
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

      <label className="search-form__filter">
        <span className="search-form__filter-label">Filter by type</span>
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
    </form>
  );
}

export default SearchForm;

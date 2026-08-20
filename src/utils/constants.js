// Application-wide constants. Non-variable values live here in ALL_CAPS.

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const PAGE_SIZE = 24;

export const OFFICIAL_ARTWORK_KEY = 'official-artwork';

export const FAVORITES_STORAGE_KEY = 'pokedex-explorer.favorites';

export const POKEAPI_HOMEPAGE = 'https://pokeapi.co/';

export const GITHUB_URL = 'https://github.com/ocplogan';

export const MAX_STAT_VALUE = 255;

// The three ways the results grid can be populated.
export const VIEW_MODES = {
  BROWSE: 'browse',
  SEARCH: 'search',
  TYPE: 'type',
};

// Type names returned by the API that have no browsable Pokémon.
export const EXCLUDED_TYPES = ['unknown', 'shadow', 'stellar'];

export const ERROR_MESSAGES = {
  LOAD_FAILED:
    "We couldn't load Pokémon right now. Please check your connection and try again.",
  SEARCH_FAILED: 'Something went wrong with your search. Please try again.',
  NOT_FOUND: 'No Pokémon matches that name or number. Try another search.',
  TYPES_FAILED: "We couldn't load the type filter, but you can still search and browse.",
};

export const EMPTY_STATE_MESSAGES = {
  NO_RESULTS: 'No Pokémon to show. Try a different search or filter.',
  NO_FAVORITES:
    "You haven't saved any Pokémon yet. Tap the heart on a card to add it here.",
};

export const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const TYPE_COLORS = {
  normal: '#9099a1',
  fire: '#ff9d55',
  water: '#4d90d5',
  electric: '#f4d23c',
  grass: '#63bc5a',
  ice: '#73cec0',
  fighting: '#ce4069',
  poison: '#ab6ac8',
  ground: '#d97845',
  flying: '#8fa8dd',
  psychic: '#fa7179',
  bug: '#90c12c',
  rock: '#c5b78c',
  ghost: '#5269ad',
  dragon: '#0b6dc3',
  dark: '#5a5465',
  steel: '#5a8ea1',
  fairy: '#ec8fe6',
};

// Application-wide constants. Non-variable values live here in ALL_CAPS.

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const PAGE_SIZE = 24;

// Large enough to fetch the whole Pokémon index in one request.
export const ALL_POKEMON_LIMIT = 2000;

// PokeAPI numbers alternate forms (megas, regional, totems, caps...) from
// 10001 upward; everything below is a default Pokédex entry.
export const FORM_ID_THRESHOLD = 10000;

export const GENERATIONS = [
  { id: 1, label: 'Gen 1', start: 1, end: 151 },
  { id: 2, label: 'Gen 2', start: 152, end: 251 },
  { id: 3, label: 'Gen 3', start: 252, end: 386 },
  { id: 4, label: 'Gen 4', start: 387, end: 493 },
  { id: 5, label: 'Gen 5', start: 494, end: 649 },
  { id: 6, label: 'Gen 6', start: 650, end: 721 },
  { id: 7, label: 'Gen 7', start: 722, end: 809 },
  { id: 8, label: 'Gen 8', start: 810, end: 905 },
  { id: 9, label: 'Gen 9', start: 906, end: 9999 },
];

export const OFFICIAL_ARTWORK_KEY = 'official-artwork';

export const FAVORITES_STORAGE_KEY = 'pokedex-explorer.favorites';

export const CURRENT_USER_STORAGE_KEY = 'pokedex-explorer.currentUser';

export const USERS_STORAGE_KEY = 'pokedex-explorer.users';

export const MIN_PASSWORD_LENGTH = 6;

export const AUTH_MESSAGES = {
  INVALID_EMAIL: 'Enter a valid email address.',
  SHORT_PASSWORD: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  MISSING_NAME: 'Enter your name.',
};

export const POKEAPI_HOMEPAGE = 'https://pokeapi.co/';

export const GITHUB_URL = 'https://github.com/ocplogan';

export const MAX_STAT_VALUE = 255;

// The three ways the results grid can be populated.
export const VIEW_MODES = {
  BROWSE: 'browse',
  SEARCH: 'search',
  TYPE: 'type',
  GENERATION: 'generation',
};

// Type names returned by the API that have no browsable Pokémon.
export const EXCLUDED_TYPES = ['unknown', 'shadow', 'stellar'];

// Shared request-failure message (matches the Stage 1 spec wording).
const REQUEST_ERROR =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.';

export const ERROR_MESSAGES = {
  LOAD_FAILED: REQUEST_ERROR,
  SEARCH_FAILED: REQUEST_ERROR,
  NOT_FOUND: 'Nothing found.',
  TYPES_FAILED: "We couldn't load the type filter, but you can still search and browse.",
};

export const EMPTY_STATE_MESSAGES = {
  NO_RESULTS: 'Nothing found.',
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

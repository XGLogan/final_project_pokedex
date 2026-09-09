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

// Pulls the numeric id out of a PokeAPI resource URL like ".../pokemon/25/".
export const RESOURCE_ID_PATTERN = /\/(\d+)\/?$/;

// "#0025" style labels are padded to this many digits.
export const ID_PAD_LENGTH = 4;

// Label for a species' default variety in the form switcher.
export const BASE_FORM_LABEL = 'Base';

// Search queries: a bare number looks up by id; only slug-safe text is sent
// to the API as an exact-name fallback.
export const NUMERIC_ID_PATTERN = /^\d+$/;
export const SLUG_PATTERN = /^[a-z0-9-]+$/;

// Longest Pokémon name is well under this; keeps the results heading tidy.
export const MAX_SEARCH_LENGTH = 40;

export const HTTP_STATUS = {
  NOT_FOUND: 404,
};

export const FAVORITES_STORAGE_KEY = 'pokedex-explorer.favorites';

export const CURRENT_USER_STORAGE_KEY = 'pokedex-explorer.currentUser';

export const USERS_STORAGE_KEY = 'pokedex-explorer.users';

export const MIN_PASSWORD_LENGTH = 6;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Greeting name for a returning user whose saved name is unknown.
export const DEFAULT_DISPLAY_NAME = 'Trainer';

export const MODALS = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export const AUTH_MESSAGES = {
  INVALID_EMAIL: 'Enter a valid email address.',
  SHORT_PASSWORD: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  MISSING_NAME: 'Enter your name.',
  PASSWORD_PLACEHOLDER: `At least ${MIN_PASSWORD_LENGTH} characters`,
  DEMO_NOTE: 'Demo sign-in for this project — your password is never stored.',
};

export const POKEAPI_HOMEPAGE = 'https://pokeapi.co/';

// The project's GitHub repository (used by the footer and About page).
export const GITHUB_URL = 'https://github.com/XGLogan/final_project_pokedex';

export const MAX_STAT_VALUE = 255;

// The ways the results grid can be populated.
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
  TYPES_FAILED: "We couldn't load the type filter, but you can still search and browse.",
  FORMS_FAILED: "We couldn't load this Pokémon's alternate forms.",
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

// Fallbacks for a type the palette below doesn't know about.
export const DEFAULT_TYPE_COLOR = 'var(--color-text-muted)';
export const DEFAULT_ACCENT_COLOR = 'var(--color-primary)';

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

// All network requests to the third-party PokeAPI live in this file.
// Requests use the native Fetch API only (no axios / jQuery).

import { ALL_POKEMON_LIMIT, BASE_URL } from './constants';

// Shared response handler: the first then() of every request returns res.json().
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
}

// The full Pokémon index (names + detail URLs) in a single request.
export function getAllPokemon() {
  return fetch(`${BASE_URL}/pokemon?limit=${ALL_POKEMON_LIMIT}&offset=0`).then(
    checkResponse,
  );
}

// Full details for a single Pokémon (sprites, types, stats, abilities, size).
export function getPokemonByName(nameOrId) {
  const query = String(nameOrId).trim().toLowerCase();
  return fetch(`${BASE_URL}/pokemon/${query}`).then(checkResponse);
}

// The list of Pokémon types, used to populate the type filter.
export function getTypes() {
  return fetch(`${BASE_URL}/type`).then(checkResponse);
}

// The Pokémon that belong to a given type.
export function getPokemonByType(type) {
  return fetch(`${BASE_URL}/type/${type}`).then(checkResponse);
}

// The species record for a Pokémon, whose `varieties` list its alternate forms
// (mega, origin, regional, etc.).
export function getPokemonSpecies(nameOrId) {
  const query = String(nameOrId).trim().toLowerCase();
  return fetch(`${BASE_URL}/pokemon-species/${query}`).then(checkResponse);
}

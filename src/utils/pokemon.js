// Pure helpers that shape and format PokeAPI data for the UI.

import { OFFICIAL_ARTWORK_KEY } from './constants';

// Convert a raw PokeAPI detail object into the compact shape the UI needs.
export function normalizePokemon(raw) {
  const officialArtwork = raw.sprites?.other?.[OFFICIAL_ARTWORK_KEY]?.front_default;
  const defaultSprite = raw.sprites?.front_default;

  return {
    id: raw.id,
    name: raw.name,
    speciesName: raw.species?.name || raw.name,
    imageUrl: officialArtwork || defaultSprite || '',
    types: raw.types.map((entry) => entry.type.name),
    heightInMeters: raw.height / 10, // decimetres -> metres
    weightInKilograms: raw.weight / 10, // hectograms -> kilograms
    abilities: raw.abilities.map((entry) => entry.ability.name),
    stats: raw.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

// "#0025" style padded id label.
export function formatId(id) {
  return `#${String(id).padStart(4, '0')}`;
}

// Capitalize a single word (used for type names).
export function capitalize(text) {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Turn an API slug like "mr-mime" into a display name like "Mr Mime".
export function formatName(name) {
  return name
    .split('-')
    .map((part) => capitalize(part))
    .join(' ');
}

// A short label for a form-switch button, e.g. "rayquaza-mega" -> "Mega",
// "giratina-origin" -> "Origin", and the base variety -> "Base".
export function formLabel(varietyName, speciesName) {
  if (varietyName === speciesName) {
    return 'Base';
  }
  const stripped = varietyName.startsWith(`${speciesName}-`)
    ? varietyName.slice(speciesName.length + 1)
    : varietyName;
  return formatName(stripped);
}

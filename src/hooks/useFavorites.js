import { useCallback, useEffect, useMemo, useState } from 'react';
import { FAVORITES_STORAGE_KEY } from '../utils/constants';

// True when a stored item has the shape the UI expects to render.
function isValidFavorite(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id !== 'undefined' &&
    typeof item.name === 'string' &&
    Array.isArray(item.types)
  );
}

// Read the per-user favorites map from localStorage: { [email]: Pokemon[] }.
function readStore() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }
    const clean = {};
    Object.keys(parsed).forEach((email) => {
      if (Array.isArray(parsed[email])) {
        clean[email] = parsed[email].filter(isValidFavorite);
      }
    });
    return clean;
  } catch {
    return {};
  }
}

// Favorites are scoped to the signed-in user. When no one is signed in the
// list is empty; signing back in restores that user's saved Pokémon.
export default function useFavorites(userEmail) {
  const [store, setStore] = useState(readStore);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  const favorites = useMemo(
    () => (userEmail && store[userEmail] ? store[userEmail] : []),
    [store, userEmail],
  );

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (pokemon) => {
      if (!userEmail) {
        return;
      }
      setStore((previous) => {
        const current = previous[userEmail] || [];
        const nextList = current.some((item) => item.id === pokemon.id)
          ? current.filter((item) => item.id !== pokemon.id)
          : [pokemon, ...current];
        return { ...previous, [userEmail]: nextList };
      });
    },
    [userEmail],
  );

  return { favorites, isFavorite, toggleFavorite };
}

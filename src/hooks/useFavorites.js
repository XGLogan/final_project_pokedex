import { useCallback, useEffect, useState } from 'react';
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

// Read the saved favorites from localStorage, always returning a clean array.
function readStoredFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter(isValidFavorite) : [];
  } catch {
    return [];
  }
}

// Custom hook that keeps the favorites list in sync with localStorage.
export default function useFavorites() {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((pokemon) => {
    setFavorites((previous) =>
      previous.some((item) => item.id === pokemon.id)
        ? previous.filter((item) => item.id !== pokemon.id)
        : [pokemon, ...previous],
    );
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}

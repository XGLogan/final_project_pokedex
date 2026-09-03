import { useCallback, useEffect, useState } from 'react';
import { CURRENT_USER_STORAGE_KEY, USERS_STORAGE_KEY } from '../utils/constants';
import { nameFromEmail } from '../utils/validation';

function readCurrentUser() {
  try {
    const stored = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    if (parsed && typeof parsed === 'object' && typeof parsed.email === 'string') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function readUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Simulated auth for this frontend-only build: the session lives in
// localStorage and no passwords are stored. Real authentication against a
// backend is an optional Stage 2/3 task.
export default function useAuth() {
  const [currentUser, setCurrentUser] = useState(readCurrentUser);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
  }, [currentUser]);

  const register = useCallback(({ name, email }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const others = readUsers().filter((user) => user.email !== cleanEmail);
    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify([...others, { name: cleanName, email: cleanEmail }]),
    );
    setCurrentUser({ name: cleanName, email: cleanEmail });
  }, []);

  const login = useCallback(({ email }) => {
    const cleanEmail = email.trim().toLowerCase();
    const knownUser = readUsers().find((user) => user.email === cleanEmail);
    setCurrentUser({
      name: knownUser ? knownUser.name : nameFromEmail(cleanEmail),
      email: cleanEmail,
    });
  }, []);

  const signOut = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return { currentUser, isLoggedIn: Boolean(currentUser), register, login, signOut };
}

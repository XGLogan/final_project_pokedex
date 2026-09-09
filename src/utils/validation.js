// Simple client-side validators and helpers for the auth forms.

import { DEFAULT_DISPLAY_NAME, EMAIL_PATTERN } from './constants';

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email.trim());
}

// Derive a friendly display name from an email (used when a returning user
// logs in and we don't have their saved name).
export function nameFromEmail(email) {
  const localPart = email.split('@')[0] || DEFAULT_DISPLAY_NAME;
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

// Simple client-side validators for the auth forms.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email.trim());
}

// Derive a friendly display name from an email (used when a returning user
// logs in and we don't have their saved name).
export function nameFromEmail(email) {
  const localPart = email.split('@')[0] || 'Trainer';
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

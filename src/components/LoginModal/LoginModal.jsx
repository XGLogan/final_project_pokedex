import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { isValidEmail } from '../../utils/validation';
import { AUTH_MESSAGES, MIN_PASSWORD_LENGTH } from '../../utils/constants';
import './LoginModal.css';

function LoginModal({ onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = isValidEmail(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isFormValid = isEmailValid && isPasswordValid;

  function handleSubmit() {
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      buttonText="Sign in"
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Don't have an account?"
      switchActionText="Sign up"
      onSwitch={onSwitchToRegister}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        {email && !isEmailValid && (
          <span className="modal__error">{AUTH_MESSAGES.INVALID_EMAIL}</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
        {password && !isPasswordValid && (
          <span className="modal__error">{AUTH_MESSAGES.SHORT_PASSWORD}</span>
        )}
      </label>

      <p className="login-modal__note">{AUTH_MESSAGES.DEMO_NOTE}</p>
    </ModalWithForm>
  );
}

export default LoginModal;

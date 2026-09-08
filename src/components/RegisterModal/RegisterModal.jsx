import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { isValidEmail } from '../../utils/validation';
import { AUTH_MESSAGES, MIN_PASSWORD_LENGTH } from '../../utils/constants';
import './RegisterModal.css';

function RegisterModal({ onClose, onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  function handleSubmit() {
    onRegister({ name, email, password });
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Already have an account?"
      switchActionText="Sign in"
      onSwitch={onSwitchToLogin}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        {name && !isNameValid && (
          <span className="modal__error">{AUTH_MESSAGES.MISSING_NAME}</span>
        )}
      </label>

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
          placeholder={AUTH_MESSAGES.PASSWORD_PLACEHOLDER}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
        {password && !isPasswordValid && (
          <span className="modal__error">{AUTH_MESSAGES.SHORT_PASSWORD}</span>
        )}
      </label>

      <p className="register-modal__note">{AUTH_MESSAGES.DEMO_NOTE}</p>
    </ModalWithForm>
  );
}

export default RegisterModal;

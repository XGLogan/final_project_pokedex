import { useEffect, useRef } from 'react';
import closeIcon from '../../images/close.svg';
import './ModalWithForm.css';

function ModalWithForm({
  title,
  name,
  buttonText,
  isValid,
  onClose,
  onSubmit,
  children,
  switchText,
  switchActionText,
  onSwitch,
}) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Move focus into the dialog on open, close on Escape, and restore focus
  // to the trigger on close. The listener is removed on unmount (no leak).
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function handleEscClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container" role="dialog" aria-modal="true" aria-label={title}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
          ref={closeButtonRef}
        >
          <img src={closeIcon} alt="" aria-hidden="true" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={handleSubmit} noValidate>
          <fieldset className="modal__fields">{children}</fieldset>
          <button type="submit" className="modal__submit" disabled={!isValid}>
            {buttonText}
          </button>
          {switchText && (
            <p className="modal__switch">
              {switchText}{' '}
              <button type="button" className="modal__switch-button" onClick={onSwitch}>
                {switchActionText}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

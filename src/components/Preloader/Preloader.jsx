import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__spinner" aria-hidden="true" />
      <span className="preloader__text">Loading Pokémon…</span>
    </div>
  );
}

export default Preloader;

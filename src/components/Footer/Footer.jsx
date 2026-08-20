import { GITHUB_URL, POKEAPI_HOMEPAGE } from '../../utils/constants';
import githubIcon from '../../images/github.svg';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__copyright">
          © {currentYear} Pokédex Explorer · TripleTen final project
        </p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              href={POKEAPI_HOMEPAGE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Data from PokeAPI
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="" aria-hidden="true" className="footer__icon" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

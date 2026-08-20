import { GITHUB_URL, POKEAPI_HOMEPAGE } from '../../utils/constants';
import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about__container container">
        <h1 className="about__title">About Pokédex Explorer</h1>
        <p className="about__lead">
          Pokédex Explorer is a small React app for searching, browsing, and saving
          Pokémon. It was built as a TripleTen Software Engineering final project.
        </p>

        <section className="about__section">
          <h2 className="about__heading">What it does</h2>
          <p className="about__text">
            Browse Pokémon in a responsive grid, search by name or number, and filter by
            type. Open any Pokémon to see its artwork, types, base stats, abilities, and
            size. Save the ones you like — your favorites are stored in your browser and
            stay there when you come back.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__heading">The data</h2>
          <p className="about__text">
            All data comes live from{' '}
            <a
              className="about__link"
              href={POKEAPI_HOMEPAGE}
              target="_blank"
              rel="noopener noreferrer"
            >
              PokeAPI
            </a>
            , a free and open RESTful Pokémon API. No account or API key is required.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__heading">Tech stack</h2>
          <ul className="about__list">
            <li className="about__list-item">React + Vite</li>
            <li className="about__list-item">React Router for navigation</li>
            <li className="about__list-item">The Fetch API for network requests</li>
            <li className="about__list-item">Semantic HTML and BEM-based CSS</li>
          </ul>
        </section>

        <section className="about__section">
          <h2 className="about__heading">The developer</h2>
          <p className="about__text">
            Built by a TripleTen student learning full-stack web development. You can view
            the source code on{' '}
            <a
              className="about__link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}

export default About;

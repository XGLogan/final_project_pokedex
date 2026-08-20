# Pokédex Explorer

A responsive React single-page app for searching, browsing, and saving Pokémon,
built with live data from the free [PokeAPI](https://pokeapi.co/). This is the
**custom** track of the TripleTen Software Engineering final project (Stage 1 —
React frontend + external API).

<!-- After deploying, replace the link below with your live GitHub Pages URL. -->
🔗 **Live demo:** `https://<your-username>.github.io/<your-repo>/`

## Features

- **Browse** Pokémon in a responsive card grid with **Load more** pagination.
- **Search** by name or number against the PokeAPI.
- **Filter** by Pokémon type.
- **Detail popup** for any Pokémon (artwork, types, base stats, abilities,
  height, weight). Closes via the ✕ button, clicking the overlay, or pressing
  **Esc**.
- **Favorites** saved to `localStorage` and shown on a dedicated page — they
  persist across reloads and browser sessions.
- **Three routes** (`/`, `/favorites`, `/about`) plus a 404 page, using
  React Router.
- Graceful **loading, empty, and error** states.
- Mobile-first and responsive down to 320px, with no horizontal scrolling.

## Tech stack

- **React 19** + **Vite** (JavaScript)
- **react-router-dom** (HashRouter) for client-side routing
- **Fetch API** for all network requests (no axios/jQuery)
- **BEM** methodology and semantic HTML
- Self-hosted fonts via `@font-face`; SVG icons
- Deployed to **GitHub Pages**

## Third-party API

All Pokémon data comes from **[PokeAPI](https://pokeapi.co/)** — free, public,
and requires no API key. Endpoints used:

| Purpose | Endpoint |
| --- | --- |
| Paginated list | `GET /pokemon?limit=&offset=` |
| Single Pokémon details | `GET /pokemon/{name-or-id}` |
| Type list (filter) | `GET /type` |
| Pokémon by type | `GET /type/{type}` |

## Project structure

```
src/
├─ components/        # one folder per component: <Name>.jsx + <Name>.css
│  ├─ App/            # owns app state and initiates all API requests
│  ├─ Header/  Footer/
│  ├─ SearchForm/
│  ├─ Card/  CardList/         # Card is reused on Home and Favorites
│  ├─ PokemonPopup/  Preloader/
│  └─ Home/  Favorites/  About/  NotFound/
├─ hooks/             # useFavorites (localStorage-backed)
├─ utils/             # api.js (Fetch layer), constants.js (ALL_CAPS), pokemon.js
├─ images/            # SVG icons
├─ fonts/             # self-hosted .woff2 + @font-face
└─ index.css          # design tokens + base styles
```

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the linter |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch |

## Deployment (GitHub Pages)

1. Create a GitHub repository and push this project.
2. Run `npm run deploy` — this builds the app and pushes `dist/` to a
   `gh-pages` branch.
3. In the repo's **Settings → Pages**, set the source to the **`gh-pages`**
   branch.
4. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

The app uses `HashRouter` and a relative Vite `base` (`./`), so it works from a
GitHub Pages project subpath and never 404s on a page refresh or a direct deep
link.

## Author

Built as a TripleTen Software Engineering final project.

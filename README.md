# Pokédex Explorer

A responsive React single-page app for searching, browsing, and saving Pokémon,
built with live data from the free [PokeAPI](https://pokeapi.co/). This is the
**custom** track of the TripleTen Software Engineering final project (Stage 1 —
React frontend + external API).

🔗 **Live demo:** [https://xglogan.github.io/final_project_pokedex/](https://xglogan.github.io/final_project_pokedex/)
📦 **Source:** [github.com/XGLogan/final_project_pokedex](https://github.com/XGLogan/final_project_pokedex)

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/13__mD4Uxp0Wi9GG-FUsK4EjE9EfRBBuZ/view?usp=drive_link), where I describe my project and some
challenges I faced while building it.

## Features

- **Browse** the whole Pokédex in a responsive card grid with **Show more**
  paging. Only default Pokédex entries appear in the grid — alternate forms live
  in the detail popup.
- **Search** by partial name (`char` → Charmander, Charmeleon, Charizard…) or by
  Pokédex number, with exact-slug fallback (`rayquaza-mega`).
- **Filter** by type or by generation (Gen 1–9) — jump straight to any part of
  the Pokédex.
- **Detail popup** for any Pokémon: artwork, types, base stats, abilities,
  height and weight, plus a **form switcher** (Base / Mega / Origin / regional…)
  when the species has alternate forms. Closes via the ✕ button, the overlay, or
  **Esc**.
- **Sign up / Sign in** modals with client-side validation, built on a reusable
  `ModalWithForm` component. The header shows a greeting and **Log out** when
  signed in. *(Authentication is simulated on the frontend for Stage 1 — no
  server and no passwords are stored.)*
- **Favorites per account**: saving requires being signed in, each account keeps
  its own list in `localStorage`, and it comes back when that account signs in
  again.
- **Four routes** (`/`, `/favorites`, `/about`, and a 404 page) via React Router.
- Graceful **loading, empty, and error** states; mobile-first and responsive
  down to 320px with no horizontal scrolling.

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
| Full Pokémon index (names + ids) | `GET /pokemon?limit=2000` |
| Single Pokémon details | `GET /pokemon/{name-or-id}` |
| Type list (filter) | `GET /type` |
| Pokémon by type | `GET /type/{type}` |
| Species → alternate forms | `GET /pokemon-species/{name}` |

## Project structure

```
src/
├─ components/        # one folder per component: <Name>.jsx + <Name>.css
│  ├─ App/            # owns app state and initiates all API requests
│  ├─ Header/  Navigation/  Footer/
│  ├─ Main/           # home page: search, filters, results grid
│  ├─ SearchForm/  Card/  CardList/  Preloader/
│  ├─ PokemonPopup/   # detail modal with form switcher
│  ├─ ModalWithForm/  LoginModal/  RegisterModal/
│  └─ Favorites/  About/  NotFound/
├─ hooks/             # useFavorites (per-user, localStorage), useAuth (simulated session)
├─ utils/             # api.js (Fetch layer), constants.js (ALL_CAPS), pokemon.js, validation.js
├─ images/            # SVG icons
├─ fonts/             # self-hosted .woff2 + @font-face
└─ index.css          # design tokens + base styles
```

## Getting started

Requires Node.js 20.19+ (or 22.12+).

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

Built by Logan O'Connor as a TripleTen Software Engineering final project.

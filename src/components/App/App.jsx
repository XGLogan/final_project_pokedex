import { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import PokemonPopup from '../PokemonPopup/PokemonPopup';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import useFavorites from '../../hooks/useFavorites';
import useAuth from '../../hooks/useAuth';
import {
  getAllPokemon,
  getPokemonByName,
  getPokemonByType,
  getPokemonSpecies,
  getTypes,
} from '../../utils/api';
import { formLabel, idFromUrl, normalizePokemon } from '../../utils/pokemon';
import {
  ERROR_MESSAGES,
  EXCLUDED_TYPES,
  FORM_ID_THRESHOLD,
  GENERATIONS,
  PAGE_SIZE,
  VIEW_MODES,
} from '../../utils/constants';
import './App.css';

// Keep only default Pokédex entries (no alternate forms), ordered by number.
function toDefaultEntries(items) {
  return items
    .map((item) => ({ name: item.name, id: idFromUrl(item.url) }))
    .filter((entry) => entry.id > 0 && entry.id < FORM_ID_THRESHOLD)
    .sort((first, second) => first.id - second.id);
}

function App() {
  // The full list of default Pokémon (name + id), loaded once on mount.
  const [allPokemon, setAllPokemon] = useState([]);
  // The entries for the current view; the grid loads them PAGE_SIZE at a time.
  const [pool, setPool] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [mode, setMode] = useState(VIEW_MODES.BROWSE);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('');
  const [activeGeneration, setActiveGeneration] = useState('');
  const [types, setTypes] = useState([]);
  const [typesError, setTypesError] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [forms, setForms] = useState([]);

  const { currentUser, isLoggedIn, register, login, signOut } = useAuth();
  const { favorites, isFavorite, toggleFavorite } = useFavorites(
    currentUser ? currentUser.email : null,
  );
  const [activeModal, setActiveModal] = useState('');

  const hasMore = pool.length > loadedCount;

  // Tracks the most recent grid request so stale responses can be ignored.
  const requestIdRef = useRef(0);
  // Separate token for popup/form requests.
  const popupRequestIdRef = useRef(0);

  // Fetch details for a list of entries. A single failed detail is skipped
  // rather than discarding the whole page.
  const loadDetailsFor = useCallback(
    (entries) =>
      Promise.all(
        entries.map((entry) => getPokemonByName(entry.name).catch(() => null)),
      ).then((rawList) => rawList.filter(Boolean).map(normalizePokemon)),
    [],
  );

  // Replace the grid with the first page of a new pool of entries.
  const showPool = useCallback(
    (nextPool) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setPool(nextPool);
      setLoadedCount(0);
      setPokemons([]);
      setIsLoading(true);
      setErrorMessage('');

      const firstPage = nextPool.slice(0, PAGE_SIZE);
      loadDetailsFor(firstPage)
        .then((detailed) => {
          if (requestId !== requestIdRef.current) {
            return;
          }
          setPokemons(detailed);
          setLoadedCount(firstPage.length);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          if (requestId !== requestIdRef.current) {
            return;
          }
          setErrorMessage(ERROR_MESSAGES.LOAD_FAILED);
          setIsLoading(false);
        });
    },
    [loadDetailsFor],
  );

  // Load the Pokémon index and the type list once on mount.
  useEffect(() => {
    getAllPokemon()
      .then((data) => {
        const entries = toDefaultEntries(data.results);
        setAllPokemon(entries);
        showPool(entries);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(ERROR_MESSAGES.LOAD_FAILED);
        setIsLoading(false);
      });

    getTypes()
      .then((data) => {
        const typeNames = data.results
          .map((item) => item.name)
          .filter((name) => !EXCLUDED_TYPES.includes(name));
        setTypes(typeNames);
      })
      .catch((error) => {
        console.error(error);
        setTypesError(ERROR_MESSAGES.TYPES_FAILED);
      });
  }, [showPool]);

  // Return to the default browse view.
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchQuery('');
    setActiveType('');
    setActiveGeneration('');
    setMode(VIEW_MODES.BROWSE);
    showPool(allPokemon);
  }, [allPokemon, showPool]);

  // Search by name (partial match) or by Pokédex number.
  function handleSearch(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      handleClearSearch();
      return;
    }

    const normalizedQuery = trimmedQuery.toLowerCase();
    setMode(VIEW_MODES.SEARCH);
    setActiveType('');
    setActiveGeneration('');
    setSearchQuery(trimmedQuery);

    const isNumber = /^\d+$/.test(normalizedQuery);
    const matches = allPokemon.filter((entry) =>
      isNumber ? entry.id === Number(normalizedQuery) : entry.name.includes(normalizedQuery),
    );
    if (matches.length > 0) {
      showPool(matches);
      return;
    }

    // Fallback for exact slugs the index doesn't list (e.g. "rayquaza-mega").
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setPool([]);
    setLoadedCount(0);
    setPokemons([]);
    setIsLoading(true);
    setErrorMessage('');

    getPokemonByName(normalizedQuery)
      .then((raw) => {
        if (requestId !== requestIdRef.current) {
          return;
        }
        const found = normalizePokemon(raw);
        setPool([{ id: found.id, name: found.name }]);
        setLoadedCount(1);
        setPokemons([found]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (requestId !== requestIdRef.current) {
          return;
        }
        const isNotFound = String(error.message).includes('404');
        setErrorMessage(isNotFound ? ERROR_MESSAGES.NOT_FOUND : ERROR_MESSAGES.SEARCH_FAILED);
        setIsLoading(false);
      });
  }

  // Filter the grid by a Pokémon type.
  function handleSelectType(type) {
    if (!type) {
      handleClearSearch();
      return;
    }

    setMode(VIEW_MODES.TYPE);
    setActiveType(type);
    setActiveGeneration('');
    setSearchTerm('');
    setSearchQuery('');

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setPool([]);
    setLoadedCount(0);
    setPokemons([]);
    setIsLoading(true);
    setErrorMessage('');

    getPokemonByType(type)
      .then((data) => {
        if (requestId !== requestIdRef.current) {
          return;
        }
        showPool(toDefaultEntries(data.pokemon.map((entry) => entry.pokemon)));
      })
      .catch((error) => {
        console.error(error);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setErrorMessage(ERROR_MESSAGES.LOAD_FAILED);
        setIsLoading(false);
      });
  }

  // Filter the grid by generation (a Pokédex number range).
  function handleSelectGeneration(generationId) {
    if (!generationId) {
      handleClearSearch();
      return;
    }

    const generation = GENERATIONS.find((item) => String(item.id) === String(generationId));
    if (!generation) {
      return;
    }

    setMode(VIEW_MODES.GENERATION);
    setActiveGeneration(String(generation.id));
    setActiveType('');
    setSearchTerm('');
    setSearchQuery('');
    showPool(
      allPokemon.filter((entry) => entry.id >= generation.start && entry.id <= generation.end),
    );
  }

  // Append the next page of the current pool.
  function handleLoadMore() {
    const nextEntries = pool.slice(loadedCount, loadedCount + PAGE_SIZE);
    if (nextEntries.length === 0) {
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setErrorMessage('');

    loadDetailsFor(nextEntries)
      .then((detailed) => {
        if (requestId !== requestIdRef.current) {
          return;
        }
        setPokemons((previous) => [...previous, ...detailed]);
        setLoadedCount(loadedCount + nextEntries.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setErrorMessage(ERROR_MESSAGES.LOAD_FAILED);
        setIsLoading(false);
      });
  }

  const handleCardClick = useCallback((pokemon) => {
    const requestId = popupRequestIdRef.current + 1;
    popupRequestIdRef.current = requestId;
    setSelectedPokemon(pokemon);
    setForms([]);

    // Look up the species to see if it has alternate forms (mega, origin, etc.).
    getPokemonSpecies(pokemon.speciesName)
      .then((species) => {
        if (requestId !== popupRequestIdRef.current) {
          return;
        }
        const varieties = species.varieties || [];
        setForms(
          varieties.length > 1
            ? varieties.map((variety) => ({
                name: variety.pokemon.name,
                label: formLabel(variety.pokemon.name, species.name),
              }))
            : [],
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectForm = useCallback((varietyName) => {
    const requestId = popupRequestIdRef.current + 1;
    popupRequestIdRef.current = requestId;

    getPokemonByName(varietyName)
      .then((raw) => {
        if (requestId !== popupRequestIdRef.current) {
          return;
        }
        setSelectedPokemon(normalizePokemon(raw));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClosePopup = useCallback(() => {
    popupRequestIdRef.current += 1;
    setSelectedPokemon(null);
    setForms([]);
  }, []);

  const handleOpenLogin = useCallback(() => setActiveModal('login'), []);
  const handleOpenRegister = useCallback(() => setActiveModal('register'), []);
  const handleCloseModal = useCallback(() => setActiveModal(''), []);

  const handleLogin = useCallback(
    (credentials) => {
      login(credentials);
      setActiveModal('');
    },
    [login],
  );

  const handleRegister = useCallback(
    (formValues) => {
      register(formValues);
      setActiveModal('');
    },
    [register],
  );

  // Saving requires an account; prompt sign-in when logged out.
  const handleToggleFavorite = useCallback(
    (pokemon) => {
      if (!isLoggedIn) {
        setActiveModal('login');
        return;
      }
      toggleFavorite(pokemon);
    },
    [isLoggedIn, toggleFavorite],
  );

  return (
    <div className="page">
      <Header
        favoritesCount={favorites.length}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignInClick={handleOpenLogin}
        onSignUpClick={handleOpenRegister}
        onSignOut={signOut}
      />
      <main className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                pokemons={pokemons}
                isLoading={isLoading}
                errorMessage={errorMessage}
                typesError={typesError}
                hasMore={hasMore}
                mode={mode}
                searchTerm={searchTerm}
                searchQuery={searchQuery}
                activeType={activeType}
                activeGeneration={activeGeneration}
                types={types}
                onSearchTermChange={setSearchTerm}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
                onSelectType={handleSelectType}
                onSelectGeneration={handleSelectGeneration}
                onLoadMore={handleLoadMore}
                onCardClick={handleCardClick}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                isLoggedIn={isLoggedIn}
                onSignInClick={handleOpenLogin}
                onCardClick={handleCardClick}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <PokemonPopup
        pokemon={selectedPokemon}
        forms={forms}
        onSelectForm={handleSelectForm}
        onClose={handleClosePopup}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      {activeModal === 'login' && (
        <LoginModal
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSwitchToRegister={handleOpenRegister}
        />
      )}
      {activeModal === 'register' && (
        <RegisterModal
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onSwitchToLogin={handleOpenLogin}
        />
      )}
    </div>
  );
}

export default App;

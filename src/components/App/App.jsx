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
  getPokemonByName,
  getPokemonByType,
  getPokemonPage,
  getPokemonSpecies,
  getTypes,
} from '../../utils/api';
import { formLabel, normalizePokemon } from '../../utils/pokemon';
import {
  ERROR_MESSAGES,
  EXCLUDED_TYPES,
  PAGE_SIZE,
  VIEW_MODES,
} from '../../utils/constants';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [browseOffset, setBrowseOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [mode, setMode] = useState(VIEW_MODES.BROWSE);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('');
  const [typePool, setTypePool] = useState([]);
  const [typeLoadedCount, setTypeLoadedCount] = useState(0);
  const [types, setTypes] = useState([]);
  const [typesError, setTypesError] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [forms, setForms] = useState([]);

  const { currentUser, isLoggedIn, register, login, signOut } = useAuth();
  const { favorites, isFavorite, toggleFavorite } = useFavorites(
    currentUser ? currentUser.email : null,
  );
  const [activeModal, setActiveModal] = useState('');

  // Tracks the most recent request so stale responses can be ignored.
  const requestIdRef = useRef(0);
  // Separate token for popup/form requests.
  const popupRequestIdRef = useRef(0);

  // Fetch details for a list of names. A single failed detail is skipped
  // rather than discarding the whole page.
  const loadDetailsForNames = useCallback(
    (names) =>
      Promise.all(
        names.map((name) => getPokemonByName(name).catch(() => null)),
      ).then((rawList) => rawList.filter(Boolean).map(normalizePokemon)),
    [],
  );

  // Load a page of the browse grid, optionally replacing the current results.
  const loadBrowse = useCallback(
    (offset, shouldReset) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      getPokemonPage(offset)
        .then((page) =>
          loadDetailsForNames(page.results.map((item) => item.name)).then((detailed) => ({
            detailed,
            hasNext: Boolean(page.next),
          })),
        )
        .then(({ detailed, hasNext }) => {
          if (requestId !== requestIdRef.current) {
            return;
          }
          setPokemons((previous) => (shouldReset ? detailed : [...previous, ...detailed]));
          setHasMore(hasNext);
          setBrowseOffset(offset);
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
    [loadDetailsForNames],
  );

  // Initial browse load plus the type list for the filter (runs once on mount).
  useEffect(() => {
    loadBrowse(0, true);

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
  }, [loadBrowse]);

  // Return to the default paginated browse view.
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchQuery('');
    setActiveType('');
    setMode(VIEW_MODES.BROWSE);
    setErrorMessage('');
    setIsLoading(true);
    loadBrowse(0, true);
  }, [loadBrowse]);

  // Search for a single Pokémon by name or id.
  function handleSearch(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      handleClearSearch();
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setMode(VIEW_MODES.SEARCH);
    setActiveType('');
    setSearchQuery(trimmedQuery);
    setHasMore(false);
    setIsLoading(true);
    setErrorMessage('');

    getPokemonByName(trimmedQuery)
      .then((raw) => {
        if (requestId !== requestIdRef.current) {
          return;
        }
        setPokemons([normalizePokemon(raw)]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (requestId !== requestIdRef.current) {
          return;
        }
        const isNotFound = String(error.message).includes('404');
        setPokemons([]);
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

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setMode(VIEW_MODES.TYPE);
    setActiveType(type);
    setSearchTerm('');
    setSearchQuery('');
    setIsLoading(true);
    setErrorMessage('');

    getPokemonByType(type)
      .then((data) => {
        const names = data.pokemon.map((entry) => entry.pokemon.name);
        return loadDetailsForNames(names.slice(0, PAGE_SIZE)).then((detailed) => ({
          detailed,
          names,
        }));
      })
      .then(({ detailed, names }) => {
        if (requestId !== requestIdRef.current) {
          return;
        }
        setTypePool(names);
        setTypeLoadedCount(detailed.length);
        setPokemons(detailed);
        setHasMore(names.length > detailed.length);
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

  // Append the next batch of results for the current view.
  function handleLoadMore() {
    if (mode === VIEW_MODES.BROWSE) {
      setIsLoading(true);
      setErrorMessage('');
      loadBrowse(browseOffset + PAGE_SIZE, false);
      return;
    }

    if (mode === VIEW_MODES.TYPE) {
      const nextNames = typePool.slice(typeLoadedCount, typeLoadedCount + PAGE_SIZE);
      if (nextNames.length === 0) {
        setHasMore(false);
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setIsLoading(true);
      setErrorMessage('');

      loadDetailsForNames(nextNames)
        .then((detailed) => {
          if (requestId !== requestIdRef.current) {
            return;
          }
          setPokemons((previous) => [...previous, ...detailed]);
          const newLoadedCount = typeLoadedCount + detailed.length;
          setTypeLoadedCount(newLoadedCount);
          setHasMore(typePool.length > newLoadedCount);
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
                types={types}
                onSearchTermChange={setSearchTerm}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
                onSelectType={handleSelectType}
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

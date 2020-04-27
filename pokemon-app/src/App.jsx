import React, { useState, useEffect } from "react";

import { fetchLoginStatus, fetchFamousPokemon } from "./services";
import Search from "./components/Search";
import Nav from "./components/Nav";
import PokemonImage from "./components/PokemonImage";
import Login from "./components/Login";
import Error from "./components/Error";
import "./App.css";

const App = () => {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    data: {},
    error: "",
    favorites: {},
    famous: {},
  });

  useEffect(() => {
    fetchLoginStatus().then((userInfo) => {
      fetchFamousPokemon().then((famousOne) => {
        setUserState({
          username: userInfo.userName,
          isLoggedIn: true,
          famous: famousOne,
        });
      });
    });
  }, []);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username,
    });
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false,
    });
  };

  const handleSearch = (data, username, favorites) => {
    setUserState({
      favorites: favorites,
      username: username,
      isLoggedIn: true,
      data: data,
    });
  };
  const handleError = (error) => {
    setUserState({
      error: error,
      isLoggedIn: false,
    });
  };
  let content;
  let searchPokemon;
  let pokemonCard;
  let errorContent;
  if (userState.isLoggedIn) {
    searchPokemon = <Search user={userState} onSearch={handleSearch} />;
  } else {
    content = <Login onLogin={login} />;
  }

  if (userState.data) {
    pokemonCard = (
      <PokemonImage
        user={userState}
        details={userState.data}
        error={handleError}
      />
    );
  }
  if (userState.error !== "") {
    errorContent = <Error message={userState.error} />;
  }

  return (
    <div className="app">
      <Nav user={userState} onLogout={logout} />
      {errorContent}
      {content}
      {searchPokemon}
      {pokemonCard}
    </div>
  );
};

export default App;

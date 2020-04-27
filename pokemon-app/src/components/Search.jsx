import React, { useState } from "react";
import { fetchPokemon, fetchfavorites } from "../services";
import messages from "../messages";

const Search = ({ user, onSearch }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState("");
  const performSearch = () => {
    if (!pokemonName) {
      setError(messages.POKEMONNAME_REQUIRED);
      return;
    }
    setError("");
    const convertedName = pokemonName.toLowerCase();
    fetchPokemon(convertedName)
      .then((data) => {
        setError("");
        fetchfavorites()
          .then((favorites) => {
            setPokemonName("");
            onSearch(data, user.username, favorites);
          })
          .catch((err) => {
            setError(messages[err.code || "DEFAULT"]);
          });
      })
      .catch((err) => {
        setError(messages["INCORRECT_NAME"]);
      });
  };

  return (
    <div className="search">
      <p className="error">{error}</p>
      <input
        className="search-field"
        size="90"
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter your favortite pokemon name or/ number from 1-790"
        value={pokemonName}
      />{" "}
      <button className="button" onClick={performSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import { fetchFamousPokemon } from "../services";
import messages from "../messages";

const TopSearchButton = ({ showFamousPokemons, errored }) => {
  const [error, setError] = useState("");
  const performFetching = () => {
    setError("");

    fetchFamousPokemon()
      .then((data) => {
        setError("");
        showFamousPokemons(data);
      })
      .catch((err) => {
        errored(messages[err.code || "DEFAULT"]);
      });
  };

  return (
    <div>
      <p className="error">{error}</p>
      <button className="add" onClick={performFetching}>
        Famous Pokemons
      </button>
    </div>
  );
};

export default TopSearchButton;

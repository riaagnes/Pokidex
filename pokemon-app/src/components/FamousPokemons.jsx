import React from "react";

const FamousPokemons = ({ data }) => {
  let pokemon;

  const showPokemons = () => {
    pokemon = Object.values(data).map((v) => {
      return (
        <li className="favorite-pokimon" key={v["name"]}>
          <img className="poki-image" alt="pokemon" src={v["image"]} />
        </li>
      );
    });
    return pokemon;
  };

  return (
    <div className="poki-list">
      <h2>Famous Pokemons </h2>
      <ul>{showPokemons()}</ul>
    </div>
  );
};

export default FamousPokemons;

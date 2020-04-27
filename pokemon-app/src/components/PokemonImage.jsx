import React, { useState } from "react";
import calculate from "../calculate";
import PokemonDetails from "./PokemonDetails";
import FavoriteButton from "./FavoriteButton";
import TopSearcheButton from "./TopSearchButton";
import Favorites from "./Favorites";
import FamousPokemons from "./FamousPokemons";

const PokemonImage = ({ details, user, error }) => {
  const [pokemonState, setPokemonState] = useState({
    name: "",
    height: "",
    weight: "",
    types: [],
    image: "",
    ability: "",
  });
  const [showFavorites, setShowFavorites] = useState({
    isClicked: false,
    favoritePokemons: {},
  });
  const [showFamousPokemons, setFamousPokemons] = useState({
    isClicked: false,
    famousPokemons: {},
  });
  if (details.species !== undefined && details.species.name !== undefined) {
    pokemonState.name = details.species.name;
    pokemonState.height = details.height;
    pokemonState.weight = details.weight;
    const variety = calculate(details.types);
    pokemonState.types = variety;
    pokemonState.image = details.sprites.front_default;
    pokemonState.ability = details.abilities[0]["ability"].name;
  }

  const performAddingToFavorites = (data) => {
    setShowFavorites({
      isClicked: true,
      favoritePokemons: data,
    });
    setFamousPokemons({
      isClicked: false,
      famousPokemons: data,
    });
  };

  const handleShowingFamousPokemon = (data) => {
    setFamousPokemons({
      isClicked: true,
      famousPokemons: data,
    });
    setShowFavorites({
      isClicked: false,
      favoritePokemons: { ...showFavorites.favoritePokemons },
    });
  };

  const performDelete = (favAfterDelete) => {
    setShowFavorites({
      isClicked: true,
      favoritePokemons: favAfterDelete,
    });
  };

  const handleError = (err) => {
    error(err);
  };

  let image;
  let detail;
  let addToFavorite;
  let topSearches;
  let favoriteList;
  if (pokemonState.image.length > 0) {
    image = (
      <div className="image-div">
        <img className="image" alt="pokemon" src={pokemonState.image} />
        <p className="introduction">
          Hello {user.username}. My name is {pokemonState.name}.{" "}
        </p>
        <p>
          {" "}
          I am {pokemonState.height} feet tall. My weight is{" "}
          {pokemonState.weight}.
        </p>
        <p> I have {pokemonState.ability} ability.</p>
      </div>
    );
    detail = <PokemonDetails state={pokemonState} />;
    addToFavorite = (
      <FavoriteButton
        data={pokemonState}
        name={pokemonState.name}
        addFavorites={performAddingToFavorites}
        errored={handleError}
      />
    );
    topSearches = (
      <TopSearcheButton
        showFamousPokemons={handleShowingFamousPokemon}
        errored={handleError}
      />
    );
  }

  if (
    Object.keys(showFavorites.favoritePokemons).length > 0 ||
    Object.keys(showFamousPokemons.famousPokemons).length > 0
  ) {
    if (
      Object.keys(showFavorites.favoritePokemons).length > 0 &&
      showFavorites.isClicked
    ) {
      favoriteList = (
        <Favorites
          data={showFavorites.favoritePokemons}
          onDelete={performDelete}
        />
      );
    }
    if (
      Object.keys(showFamousPokemons.famousPokemons).length > 0 &&
      showFamousPokemons.isClicked
    ) {
      favoriteList = (
        <FamousPokemons data={showFamousPokemons.famousPokemons} />
      );
    }
  }

  return (
    <div>
      <div className="button-container">
        <div>{addToFavorite}</div>
        <div>{topSearches}</div>
      </div>
      <div className="pokemon-details">
        {image}
        {detail}
      </div>
      <div>{favoriteList}</div>
    </div>
  );
};

export default PokemonImage;

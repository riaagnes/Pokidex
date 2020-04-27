import React, { useState } from "react";
import { addToFavorite } from "../services";
import messages from "../messages";

const FavoriteButton = ({ data, name, addFavorites, errored }) => {
  const [error, setError] = useState("");
  const performAddToFavorite = () => {
    setError("");
    addToFavorite(data, name)
      .then((info) => {
        addFavorites(info);
        setError("");
      })
      .catch((err) => {
        errored(messages[err.code || "DEFAULT"]);
      });
  };

  return (
    <div>
      <button className="add" onClick={performAddToFavorite}>
        Add To Favorites
      </button>
    </div>
  );
};

export default FavoriteButton;

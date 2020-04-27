import React from "react";

const PokemonDetails = ({ state }) => {
  return (
    <div className="details">
      <div className="detail-container">
        <div className="column-7">
          <ul className="pokimon-values">
            <li>
              <span>
                <b>Name :</b>
              </span>
              <span>{state.name}</span>
            </li>
            <li>
              <span>
                <b>Weight :</b>
              </span>
              <span>{state.weight}</span>
            </li>
          </ul>
        </div>
        <div className="column-7 push">
          <ul className="pokimon-values">
            <li>
              <span>
                <b>Height :</b>
              </span>
              <span>{state.height}</span>
            </li>
            <li>
              <span>
                <b>Type :</b>
              </span>

              <span>{state.types[0]}</span>
            </li>
          </ul>
        </div>
      </div>
      <span></span>
    </div>
  );
};

export default PokemonDetails;

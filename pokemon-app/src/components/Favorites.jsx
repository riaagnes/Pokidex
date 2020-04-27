import React, { useState } from 'react';
import { fetchPokemon,deletePokemon } from '../services';
import messages from '../messages';

//import spinner from './spinner.svg';

const Favorites = ({ data,onDelete }) => {

  // This state is all local to the component
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState('');
  const deleteFavorite = (name)=>{
    deletePokemon(name)
    .then((favorites) =>{
        onDelete(favorites)
    })
    .catch( (err) => {
        setError(messages[err.code || 'DEFAULT']);
        //setIsLoading(false);
      });
  }
  let pokemon;

  const showPokemons = () =>{
   pokemon = Object.values(data).map((v)=>{
       return(
           <li className="favorite-pokimon" key={v['name']}>
             <img className="poki-image" alt="pokemon" src={v['image']}/>
             <p> <button onClick={() => deleteFavorite(v["name"])}>X</button></p>
           </li>
       )
   })
   return pokemon
  }

  return (
      <div className="poki-list">
          <p className="error">{error}</p>
           <h2>Your Favorite Pokemons </h2>
          <ul>
              {showPokemons()}
          </ul>
          
      </div>
   
  );

};

export default Favorites;
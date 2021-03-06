const convertNetworkError = (err) => {
  return {
    code: "NETWORK-ERROR",
    err,
  };
};

const convertServiceError = (err) => Promise.reject(err);

export const fetchLoginStatus = () => {
  return fetch("/session", {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogin = (username) => {
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogout = () => {
  return fetch("/session", {
    method: "DELETE",
  })
    .catch(convertNetworkError)
    .then((response) => {
      return response.ok;
    });
};

export const fetchPokemon = (name) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`, {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const addToFavorite = (data, name) => {
  return fetch("/pokemon", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ data, name }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchfavorites = () => {
  return fetch("/favoritepokemon", {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchFamousPokemon = () => {
  return fetch("/famouspokemons", {
    method: "GET",
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const deletePokemon = (name) => {
  return fetch(`/favoritepokemon/${name}`, {
    method: "DELETE",
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

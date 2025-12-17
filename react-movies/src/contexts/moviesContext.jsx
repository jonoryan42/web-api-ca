import React, { useState, useContext, useEffect } from "react";
import { addFavorite, getFavorites, removeFavorite, 
addMustWatch, getMustWatches, removeMustWatch } from "../api/tmdb-api"; //From tmdb-api.jsx
import { AuthContext } from "./authContext";


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatches, setMustWatches] = useState( [] ) 

  const { token } = useContext(AuthContext);

  // const addToFavorites = (movie) => {
  //   let newFavorites = [];
  //   if (!favorites.includes(movie.id)){
  //     newFavorites = [...favorites, movie.id];
  //   }
  //   else{
  //     newFavorites = [...favorites];
  //   }
  //   setFavorites(newFavorites)
  // };

  useEffect(() => {
  if (!token) {
    setFavorites([]);
   return;
  }

   getFavorites(token)
    .then((ids) => {
      console.log("Fetched favorites from backend:", ids);
      setFavorites(ids);
    })
    .catch((err) => {
      console.error("getFavorites failed:", err);
      setFavorites([]);
    });
}, [token]);

  const addToFavorites = async (movie) => {
  if (favorites.includes(movie.id)) return;

  setFavorites((prev) => [...prev, movie.id]);

  try {
    await addFavorite(movie.id);
  } catch (err) {
    // rollback
    setFavorites((prev) => prev.filter((id) => id !== movie.id));
    console.error(err);
  }
};
  
//Remove from Favorites
  const removeFromFavorites = async (movieId) => {
   if (!favorites.includes(movieId)) return;

  // updates without refreshing
  setFavorites((prev) => prev.filter((id) => id !== movieId));

  try {
    await removeFavorite(movieId);
  } catch (err) {
    // rollback on failure
    setFavorites((prev) => [...prev, movieId]);
    console.error("Failed to remove favorite:", err);
  }
};

    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  // Must Watches
useEffect(() => {
  if (!token) {
    setMustWatches([]);
    return;
  }

  getMustWatches(token)
    .then(setMustWatches)
    .catch(() => setMustWatches([]));
}, [token]);

 const addToMustWatches = async (movie) => {
  if (favorites.includes(movie.id)) return;

  setMustWatches((prev) => [...prev, movie.id]);

  try {
    await addMustWatch(movie.id);
  } catch (err) {
    // rollback
    setMustWatches((prev) => prev.filter((id) => id !== movie.id));
    console.error(err);
  }
};

  //Remove from Must Watch
  const removeFromMustWatches = async (movieId) => {
   if (!mustWatches.includes(movieId)) return;

  // updates without refreshing
  setMustWatches((prev) => prev.filter((id) => id !== movieId));

  try {
    await removeMustWatch(movieId);
  } catch (err) {
    // rollback on failure
    setMustWatches((prev) => [...prev, movieId]);
    console.error("Failed to remove Must-Watch:", err);
  }
};


 return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatches,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatches,
        removeFromMustWatches,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

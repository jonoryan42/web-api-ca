import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatches, setMustWatches] = useState( [] ) 

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const addToMustWatch = (movie) => {
    let newMustWatches = [];
    if (!mustWatches.includes(movie.id)){
      newMustWatches = [...mustWatches, movie.id];
    }
    else{
      newMustWatches = [...mustWatches];
    }
    setMustWatches(newMustWatches);
      console.log("Must Watch List Updated:", newMustWatches);
  };

  const removeFromMustWatch = (movie) => {
    setMustWatches( mustWatches.filter(
      (mId) => mId !== movie.id
    ) )
  };


 return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatches,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

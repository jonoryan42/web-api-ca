import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  // const context = useContext(MoviesContext);
  const {favorites, addToFavorites} = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);

  // const handleAddToFavorites = (e) => {
  //   e.preventDefault();
  //   context.addToFavorites(movie);
  // };

  return (
    <IconButton aria-label="add to favorites"
     onClick={() => addToFavorites(movie)}
     disabled={isFavorite}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;

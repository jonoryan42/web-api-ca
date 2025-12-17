import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToPlaylistIcon = ({ movie }) => {
  const {mustWatches, addToMustWatches} = useContext(MoviesContext);

  const isMustWatch = mustWatches.includes(movie.id);

  return (
    <IconButton aria-label="Add to Must Watch"
     onClick={() => addToMustWatches(movie)}
     disabled={isMustWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;


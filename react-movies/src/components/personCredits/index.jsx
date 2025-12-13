import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png' 
import MovieCard from "../movieCard";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const PersonCredits = ({ personCredits }) => {  

  return (
    <>

<br></br>
    <Typography variant="h5" component="h5" textAlign={"center"}>
        Known For
      </Typography>
<br></br>

      <Grid container justifyContent="center" spacing={2}>
        <MovieList movies={personCredits.cast} 
        action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
        }}>
        </MovieList>
        </Grid>
      </>
  );
};
export default PersonCredits ;
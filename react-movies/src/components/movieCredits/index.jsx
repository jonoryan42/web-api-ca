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
import MovieReviews from "../movieReviews";
import { Link } from "react-router";
import Divider from "@mui/material/Divider";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieCredits = ({ credits }) => {  // Don't miss this!

  return (
    <>
    <br></br>
      <Typography variant="h5" component="h3" textAlign={"center"}>
        Credits
      </Typography>
      <br></br>

      <Typography variant="h6" component="h3" textAlign={"center"}>
        Director
      </Typography>

       <Typography variant="p" component="p" textAlign={"center"} sx={{ listStyleType: "none", paddingLeft: 0, marginLeft: 0 }}>
        {credits.crew?.filter((member) => member.job === "Director").map((c) => (
            <li key={c.id}>
              <Link to={`/person/${c.id}`}
              style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>{c.name}</Link>
            </li>
        ))}
      </Typography>

      <br></br>

      <Typography variant="h6" component="h3" textAlign={"center"}>
        Cast
      </Typography>
      
      <Typography variant="p" component="ul" textAlign={"center"} sx={{ listStyleType: "none", paddingLeft: 0, marginLeft: 0 }}>
        {credits.cast?.map((c) => (
            <li key={c.id}>
              <Link to={`/person/${c.id}`}
              style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>{c.name}</Link> as {c.character}
            </li>
        ))}
      </Typography>

      <br></br>
      
       <Typography variant="h6" component="h3" textAlign={"center"}>
        Crew
      </Typography>

      <Typography variant="p" component="ul" textAlign={"center"} sx={{ listStyleType: "none", paddingLeft: 0, marginLeft: 0 }}>
        {credits.crew?.map((c) => (
            <li key={c.id}>
              <Link to={`/person/${c.id}`}
              style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>{c.name}</Link>
            </li>
        ))}
      </Typography>

      <br></br>
      
      </>
  );
};
export default MovieCredits ;

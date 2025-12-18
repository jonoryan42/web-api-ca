import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, 
  getGenres,
  getMovie,
  getMovieImages,
  getMovieReviews,
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieCredits,
  getPerson,
  getPersonImages,
  getPersonCredits, } from '../tmdb-api'; 
import User from "../users/userModel.js"; 
import authenticate from "../../authenticate/";

const router = express.Router();

// movie routes to be added

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

//Gets for the movie apis

//Genres
router.get("/genres", asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
  })
);

//Movie details
router.get("/movie/:id", asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
  })
);

//Movie images
router.get("/:id/images", asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
  })
);

//Movie reviews
router.get("/:id/reviews", asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
  })
);

//Movie credits
router.get("/:id/credits", asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
  })
);

//Upcoming
router.get("/upcoming", asyncHandler(async (req, res) => {
    const upcoming = await getUpcomingMovies();
    res.status(200).json(upcoming);
  })
);

//Popular
router.get("/popular", asyncHandler(async (req, res) => {
    const popular = await getPopularMovies();
    res.status(200).json(popular);
  })
);

//Top-Rated
router.get("/toprated", asyncHandler(async (req, res) => {
    const topRated = await getTopRatedMovies();
    res.status(200).json(topRated);
  })
);

//Person details 
router.get("/person/:id", asyncHandler(async (req, res) => {
    const person = await getPerson(req.params.id);
    res.status(200).json(person);
  })
);

//Images
router.get("/person/:id/images", asyncHandler(async (req, res) => {
    const images = await getPersonImages(req.params.id);
    res.status(200).json(images);
  })
);

//Credits
router.get("/person/:id/credits", asyncHandler(async (req, res) => {
    const credits = await getPersonCredits(req.params.id);
    res.status(200).json(credits);
  })
);

// Get favorites
router.get("/favorites",authenticate, asyncHandler(async (req, res) => {
    res.json(req.user.favorites ?? []);
  })
);

// Post favorites
router.post("/favorites", authenticate, asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  if (movieId === undefined || movieId === null) {
    return res.json({ msg: "MovieId required" });
  }

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { favorites: Number(movieId) } },
    //updates quickly
    { new: true, select: "favorites" });

  res.json(updated.favorites);
}));

// Remove favorite
router.delete("/favorites/:movieId", authenticate, asyncHandler(async (req, res) => {
    const movieId = req.params.movieId;

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { favorites: Number(movieId) } }
    );

    res.json({ success: true });
  })
);

// Get Must-Watches
router.get("/mustwatches", authenticate, asyncHandler(async (req, res) => {
    res.json(req.user.mustWatches ?? []);
  })
);

// Post Must-Watches
router.post("/mustwatches", authenticate, asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  if (movieId === undefined || movieId === null) {
    return res.json({ msg: "MovieId required" });
  }

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { mustWatches: Number(movieId) } },
    { new: true, select: "mustWatches" });

  res.json(updated.mustWatches);
}));

//Delete from Must-Watch
router.delete("/mustwatches/:movieId", authenticate, asyncHandler(async (req, res) => {
    const movieId = req.params.movieId;

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { mustWatches: Number(movieId) } }
    );

    res.json({ success: true });
  })
);



export default router;

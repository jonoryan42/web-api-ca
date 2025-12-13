import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import MovieCredits from "../components/movieCredits/";


const MovieCreditsPage = (props) => {
  const { id } = useParams();

   const { data: movie, error: movieError, moviePending, isMovieError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  const { data: credits, error: creditsError, creditsPending, isCreditsError  } = useQuery({
    queryKey: ['credits', {id: id}],
    queryFn: getMovieCredits,
  });

 

  if (creditsPending || moviePending) {
    return <Spinner />;
  }

  if (isCreditsError || isMovieError) {
    return <h1>{movieError?.message || creditsError?.message}</h1>;
  }

  return (
    <>
      {movie && credits ? (
        <>
          <PageTemplate movie={movie}>
            <MovieCredits credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for Movie Credits...</p>
      )}
    </>
  );
};

export default MovieCreditsPage;
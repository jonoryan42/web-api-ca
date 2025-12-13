import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['top-rated'],
    queryFn: getTopRatedMovies,
  })

    if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const topRatedMovies = data.results;

     return (
      <PageTemplate
        title="Top-Rated Movies"
        movies={topRatedMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
  );
};
export default TopRatedPage;
import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';

const UpcomingPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  })

    if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const upcomingMovies = data.results;

  const mustWatches = upcomingMovies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatches', JSON.stringify(mustWatches))

     return (
      <PageTemplate
        title="Upcoming Movies"
        movies={upcomingMovies}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
      />
  );
};
export default UpcomingPage;
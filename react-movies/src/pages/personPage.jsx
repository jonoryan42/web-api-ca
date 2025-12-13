import React from "react";
import { useParams } from 'react-router';
import PageTemplate from "../components/templatePersonPage";
import { getPerson, getPersonCredits } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import PersonDetails from "../components/personDetails/";
import PersonCredits from "../components/personCredits/";


const PersonPage = (props) => {
  const { id } = useParams();

   const { data: person, error: personError, personPending, isPersonError  } = useQuery({
    queryKey: ['person', {id: id}],
    queryFn: getPerson,
  })

  const { data: personCredits, error: creditsError, creditsPending, isCreditsError  } = useQuery({
      queryKey: ['personCredits', {id: id}],
      queryFn: getPersonCredits,
    });

  if (personPending || creditsPending) {
    return <Spinner />;
  }
 
  if (isPersonError || isCreditsError) {
    return <h1>{personError?.message || creditsError?.message}</h1>;
  }

  return (
    <>
      {person && personCredits ? (
        <>
          <PageTemplate person={person}>
            <PersonDetails person={person} />
            <PersonCredits personCredits={personCredits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for Person Data...</p>
      )}
    </>
  );
};

export default PersonPage;
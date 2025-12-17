import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingPage from './pages/upcomingPage';
import MustWatchPage from './pages/mustWatchPage';
import PopularPage from './pages/popularPage';
import TopRatedPage from './pages/topRatedPage';
import MovieCreditsPage from './pages/creditsPage';
import PersonPage from './pages/personPage';
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import StartPage from "./pages/startPage";  
import SignupPage from "./pages/signupPage";
import ProtectedRoutes from "./protectedRoutes";
import AuthContextProvider from "./contexts/authContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
      <MoviesContextProvider>
        <SiteHeader />
          <Routes>
            <Route path="/" element={ <StartPage /> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/profile" element={ <ProfilePage /> } />
            <Route path="/signup" element={ <SignupPage /> } />
            
            <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/upcoming" element={ <UpcomingPage /> } />
            <Route path="/movies/must-watch" element={ <MustWatchPage /> } />
            <Route path="/movies/popular" element={ <PopularPage /> } />
            <Route path="/movies/top-rated" element={ <TopRatedPage /> } />
            <Route path="/credits/:id" element={ <MovieCreditsPage /> } />
            <Route path="/person/:id" element={ <PersonPage /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            </Route>
            <Route path="*" element={ <Navigate to="/" /> } />


          </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);


import { useState, createContext } from "react";
import { login, signup } from "../api/auth-api";
import { MoviesContext } from "./moviesContext";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

  //Set Favorites from Movies Context
  // const { setFavorites } = useContext(MoviesContext);


  //Function to put JWT token in local storage.
  const setToken = (data) => {
    if (!data) {
    localStorage.removeItem("token");
    setAuthToken(null);
    return;
  }
  localStorage.setItem("token", data);
  setAuthToken(data);
};

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
     // Remove token 
    localStorage.removeItem("token");
    setAuthToken(null);

    //Resets favorites on signout
    // setFavorites([]);

    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

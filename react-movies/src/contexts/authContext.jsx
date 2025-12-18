import { useState, createContext } from "react";
import { login, signup } from "../api/auth-api";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

  //Function to put token in local storage.
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
      return { ok: true };
    }

    return {
    ok: false,
    message: result.msg || "Invalid username or password."
  };
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    if (result.success) {
    return { ok: true };
  }

  return {
    ok: false,
    message: result.msg || "Registration failed."
  };
  };

  const signout = () => {
     // Remove token 
    localStorage.removeItem("token");
    setAuthToken(null);

    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticated,
        userName,
        authenticate,
        register,
        signout,
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

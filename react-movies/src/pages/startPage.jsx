import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const StartPage = () => {
    const context = useContext(AuthContext);
  
    return context.isAuthenticated ? (
        <p>
            Welcome {context.userName}! View <Link to="/home">Movies</Link> or your <Link to="/profile">Profile</Link>.
        </p>
    ) : (
        <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to view Movies!
        </p>
    );
  };

export default StartPage;


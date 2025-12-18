import { useContext, useState } from "react";
import { Navigate, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';

const LoginPage = () => {
     const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    //Error messages for validation
    //.trim for whitespace
    const validateUser = () => {
    if (!userName.trim()) return "Username is required.";
    if (userName.trim().length < 3) return "Username must be at least 3 characters.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

    const login = async () => {
        setError("");

    //Validation message
    const msg = validateUser();
    if (msg) {
      setError(msg);
      return;
    }

    //Backend validation
      const result = await context.authenticate(userName, password);
      if (!result?.ok) {
        setError(result.message);
      }
  };

    // let location = useLocation();

    //  // Set 'from' to path where browser is redirected after a successful login - 
    //  // either / or the protected path user requested
    // const { from } = location.state ? { from: location.state.from.pathname } 
    // : { from: "/home" };

    
    //Goes to home page after login everytime
    //replace prevents from going back to login page after login
    if (context.isAuthenticated === true) {
        return <Navigate to="/home" replace />;
    }

    return (
  <div className="login-container">
    <div className="login-form">
      <h2>Login page</h2>
      <p>You must log in to view Movies.</p>

      <input id="username" placeholder="Username"
        onChange={e => setUserName(e.target.value)}
      />
      <br />

      <input
        id="password" type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Log in</button>

      <p>
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </div>

    {/*Validation Message*/}
    <div className="login-message">
      {error && (
        <div style={{
      color: "red",
    }}>
          {error}
        </div>
      )}
    </div>
  </div>
);
};

export default LoginPage;

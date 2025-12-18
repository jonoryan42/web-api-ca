import { useContext, useState } from "react";
import { Navigate, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

   const [error, setError] = useState("");

   const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

   const validateRegister = () => {
    if (!userName.trim()) return "Username is required.";
    if (userName.trim().length < 3) return "Username must be at least 3 characters.";
    if (!password) return "Password is required.";
    if (!passwordRegEx.test(password))
      return "Password must be 8+ chars and include a letter, a number, and a symbol.";
    if (passwordAgain !== password) return "Passwords do not match.";
    return "";
  };
  
  // const register = async () => {
  //   let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //   const validPassword = passwordRegEx.test(password);

  //   if (validPassword && password === passwordAgain) {
  //     let result = await context.register(userName, password);
  //     setRegistered(result);
  //   }
  // }


  const register = async () => {
    setError("");

    const msg = validateRegister();
    if (msg) {
      setError(msg);
      return;
    }

    const result = await context.register(userName.trim(), password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

      setRegistered(true);
    };

  if (registered === true) {
    return <Navigate to="/login" replace />;
  }

    return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign Up</h2>
        <p>
          Create an account to log in. Username must be unique. Password must be 8+
          characters and include a letter, a number, and a symbol.
        </p>

        <input
          id="username"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />

        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input
          id="passwordAgain"
          type="password"
          placeholder="Re-type Password"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        <br />

        <button onClick={register}>Register</button>

        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>

      {/* Validation message */}
      <div className="login-message">
        {error && (
          <div style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;


// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Make sure to create this CSS file for styles
import { useUser } from "../../Context/UserContext";

// Import the Firebase services you plan to use
import { signIn, signInWithGoogle } from "../../firebase/authService";
import { auth, provider } from "../../firebase/firebaseConfig";
import Dashboard from "../Dashboard/Dashboard";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  const { setUser, setToken } = useUser(); // Use this hook in your component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard"); // Navigate to the dashboard after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      const user = auth.currentUser;
      //   console.log(user);
      if (user) {
        const token = await user.getIdToken();
        // console.log(token);
        setUser(user); // Set user in context
        setToken(token); // Set token in context
        navigate("/dashboard"); // Navigate to the dashboard after successful Google sign-in
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>What's Next...?</h2>
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <button onClick={handleSignInWithGoogle} className="google-signin-btn">
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;

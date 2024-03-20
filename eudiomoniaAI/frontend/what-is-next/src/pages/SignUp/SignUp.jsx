// src/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signUp, signInWithGoogle } from "../../firebase/authService";
import '../SignIn/SignIn.css';
import { Link } from 'react-router-dom';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        await signUp(email, password); // Use the signUp function from authService
        navigate('/dashboard'); // Navigate to the dashboard after successful registration
    } catch (error) {
      setError(error.message);
    }
  };


  const handleSignInWithGoogle = async () => {
    try {
        await signInWithGoogle();
        navigate('/dashboard'); // Navigate to the dashboard after successful Google sign-in
    } catch (error) {
        setError(error.message); // Set any errors to display to the user
    }
};

  return (
    <div className="signin-container">
        <h2>What's Next...?</h2>
      <form onSubmit={handleSignUp} className="signin-form">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="signin-button">Sign Up</button>
      </form>

      <button onClick={handleSignInWithGoogle} className="google-signin-btn">Sign In with Google</button>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}

export default SignUp;

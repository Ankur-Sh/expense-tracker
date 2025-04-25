import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        console.log('Signup successful!');
        navigate('/signin'); // Optionally redirect to signin after successful signup
      } else {
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Create Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSignup} className="form">
        <div className="inputGroup">
          <label htmlFor="username" className="label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Sign Up</button>
      </form>
      <p className="footerText">
        Already have an account? <a href="/signin" className="link">Sign In</a>
      </p>
    </div>
  );
};

export default SignupPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SigninPage.css';

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);
      if (response.ok && data.token) {
        setToken(data.token);
        console.log('Signin successful!', data.token);
        navigate('/');
      } else {
        console.error('Signin failed:', data.message);
      }
    } catch (error) {
      console.error('Signin error:', error);
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Sign In</h2>
      {message && <p className="message">{message}</p>}
      {token && <p className="successMessage">Successfully signed in!</p>}
      <form onSubmit={handleSignin} className="form">
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
        <button type="submit" className="button">Sign In</button>
      </form>
      <p className="footerText">
        Don't have an account? <a href="/signup" className="link">Sign Up</a>
      </p>
    </div>
  );
};

export default SigninPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and matches credentials
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Login successful!');
      
      // Save login state (optional)
      localStorage.setItem('isLoggedIn', true);
      
      // Redirect to home or dashboard
      navigate('/');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Login</h2>
        <p>Log in and start creating your next task</p>
        <p>
          Do not have an account? <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </div>

      <div className="auth-right">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <p className="forgot">
            Forgot your password? <strong>Forgot Password</strong>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

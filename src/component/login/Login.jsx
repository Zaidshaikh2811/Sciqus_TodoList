import React, { useState } from 'react';
import './Auth.scss';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await onLogin(email, password);
    if (!success) {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Welcome Back!</h2>
        <p>Log in and start creating your next task</p>
        <img src="/vite.svg" alt="Logo" style={{width: '80px', marginTop: '2rem'}} />
      </div>
      <div className="auth-right">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <div className="auth-error">{error}</div>}
          <div className="forgot">Forgot your password? <strong>Reset</strong></div>
        </form>
      </div>
    </div>
  );
};

export default Login;

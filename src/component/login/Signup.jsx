import React, { useState } from 'react';
import './Auth.scss';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await onSignup(name, email, password);
    if (result) {
      setSuccess('Account created! You can now login.');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
    } else {
      setSuccess('');
    }
      setError('Email already exists!');
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Sign Up</h2>
        <p>Create your account to start managing your tasks</p>
        <img src="/vite.svg" alt="Logo" style={{width: '80px', marginTop: '2rem'}} />
      </div>
      <div className="auth-right">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
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
          <button type="submit">Sign Up</button>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;

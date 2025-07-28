import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Account created! You can now login.');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Sign Up</h2>
        <p>Create your account to start managing your tasks</p>
        <p>
          Already have an account? <Link to="/"><strong>Login</strong></Link>
        </p>
      </div>
      <div className="auth-right">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
        </form>
      </div>
    </div>
  );
};

export default Signup;

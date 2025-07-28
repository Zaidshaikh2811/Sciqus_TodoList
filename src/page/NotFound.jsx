
import React from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9f9fb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '48px 32px',
    boxShadow: '0 2px 8px rgba(30, 34, 90, 0.04)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  heading: {
    color: '#5e60ce',
    fontSize: '2.5rem',
    marginBottom: '16px',
    fontWeight: 700,
  },
  message: {
    color: '#6c757d',
    fontSize: '1.1rem',
    marginBottom: '32px',
  },
  button: {
    background: '#5e60ce',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 28px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  buttonHover: {
    background: '#4ea8de',
  },
};

export default function NotFound() {
  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.heading}>404</div>
        <div style={styles.message}>
          Oops! The page you are looking for does not exist.
        </div>
        <button
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => window.location.href = '/'}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
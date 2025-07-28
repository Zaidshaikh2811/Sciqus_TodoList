import { useState, useEffect } from 'react';
import './App.scss';
import Dashboard from "./page/Dashboard.jsx";
import Signup from "./component/login/Signup.jsx";
import Login from "./component/login/Login.jsx";
import { fetchUsers, addUser } from "./lib/fileApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [showSignup, setShowSignup] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const handleSignup = async (name, email, password) => {
    if (users.some(u => u.email === email)) {
      return false; // Email already exists
    }
    const newUser = { id: Date.now(), name, email, password };
    const updatedUsers = await addUser(newUser);
    setUsers(updatedUsers);
    setShowSignup(false);
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <Signup onSignup={handleSignup} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <p style={{ textAlign: 'center', marginTop: 24 }}>
            {showSignup ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setShowSignup(false)}
                  style={{
                    background: 'transparent',
                    color: '#007bff',
                    border: '1px solid #007bff',
                    borderRadius: 4,
                    padding: '6px 16px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    marginLeft: 4,
                    transition: 'background-color 0.3s, color 0.3s'
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setShowSignup(true)}
                  style={{

                    color: '#000066',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: 4,
                    padding: '6px 16px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    marginLeft: 4
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </>
      ) : (
        <>
          {
            currentUser && <h2>Welcome, {currentUser.name}!</h2>
          }

          {
            currentUser && (

              <>

            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{ float: 'right', margin: 8 ,
                padding: '8px 16px',
               backgroundColor: '#f0f0f0',
                color: '#000066',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }

            }
            >
              Logout
            </button>
            <Dashboard user={currentUser} />
          </>
           )
              }

        </>
      )}
    </div>
  );
}

export default App;
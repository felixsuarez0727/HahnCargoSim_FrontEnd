import React, { useState } from 'react';
import './login.css';  
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => { 
    onLogin(username, password);
  };

  return (
    <div className="login-container"> 
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try { 
      const response = await axios.post('https://localhost:7115/User/Login', {
        username: username,
        password: password
      });
 
      const token = response.data.token; 
      setIsLoggedIn(true);
    } catch (error) { 
      console.error('Failed to login:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Logged In</h1>
          { }
        </div>
      )}
    </div>
  );
};

export default App;

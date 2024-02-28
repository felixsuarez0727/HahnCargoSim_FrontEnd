import React, { useState } from 'react';
import axios from 'axios';
import './FrontLogin/login.css';
import './App.css';
import { urlConnection, urlStartSim, urlStopSim } from './endpoints';

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
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(urlConnection, {
        username: username,
        password: password
      });

      const token = response.data.token;
      setUsername(username);
      setIsLoggedIn(true);
      setToken(token);
    } catch (error) {
      console.error('Failed to login:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };



  const handleStartSimulation = async () => {
    try {
      if (!isLoggedIn) {
        throw new Error('The user is not authenticated.');
      }

      await axios.post(urlStartSim, {}, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      console.log('The simulation has starter successfully.');
    } catch (error) {
      console.error('Error starting simulation:', error);
      alert('An error occurred while starting the simulation. Please try again.');
    }

  };

  const handleStopSimulation = async () => {
    try {
      // Check if the user is authenticated before starting the simulation
      if (!isLoggedIn) {
        throw new Error('The user is not authenticated.');
      }

      
      await axios.post(urlStopSim, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the authorization header
        }
      });

      console.log('The simulation has stopped successfully.');
      
    } catch (error) {
      console.error('Error stopping simulation:', error);
      alert('An error occurred while stopping the simulation. Please try again.');
    }
  };

  const handleOtherAction = () => {
    console.log('Another action has been executed.');
    
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="logged-in-container">
          <h1>Welcome, {username}</h1>
          <div className="control-panel-buttons">
            <button className="start-button" onClick={handleStartSimulation}>Start Simulation</button>
            <button className="stop-button" onClick={handleStopSimulation}>Stop Simulation</button>
            <button className="other-button" onClick={handleOtherAction}>Other Action</button>
          </div>
          <div className="visualization">
            <h2>Simulation Visualization</h2>
            {/* simulation visualization*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
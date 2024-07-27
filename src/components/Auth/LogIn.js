import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import "../../styles.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      navigate('/')
    } else {
      alert('Login failed');
    }
  };


  const handleNavigate=()=>{
    navigate("/signup")
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id="loginForm">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="loginName" placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="loginPassword" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span onClick={handleNavigate}>Sign up</span></p>
    </div>
  );
};

export default Login;

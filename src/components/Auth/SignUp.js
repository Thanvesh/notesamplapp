import React, { useState } from 'react';
import { signupUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import "../../styles.css"
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signupUser(username, email, password);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      navigate('/login')
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} id="signupForm">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default Signup;

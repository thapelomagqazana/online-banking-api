import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './AuthPage.css';

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Registration Data:", formData);
  };

  return (
    <div className="auth-page">
      <header>
        <h1>Create Your Account</h1>
      </header>
      <main className="auth-main">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

          {/* <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required /> */}

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/login">Log in here</Link>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
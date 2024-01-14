import React from 'react';
import { Link } from 'react-router-dom';
// import './AuthPage.css';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <header>
        <h1>Login to Your Account</h1>
      </header>
      <main className="auth-main">
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Log In</button>
        </form>

        <p>
          Don't have an account?{' '}
          <Link to="/register">Create one here</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;

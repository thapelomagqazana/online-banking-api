import React from 'react';
import { Link } from 'react-router-dom';
// import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to YourBank</h1>
        <p>Your trusted partner in financial management</p>
      </header>
      <main className="landing-main">
        <section>
          <h2>Access Your Account</h2>
          <p>Already have an account? Log in below:</p>
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
        </section>
        <section>
          <h2>New to YourBank?</h2>
          <p>Create an account to enjoy our services:</p>
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

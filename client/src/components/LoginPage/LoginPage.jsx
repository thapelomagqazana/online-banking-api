import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './AuthPage.css';

const LoginPage = () => {
  // const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset password error when user is typing
    setError();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login data to the server
    try
    {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok)
      {
        console.log("Login successful!");
        // navigate("/login");
      }
      else
      {
        const errorData = await response.json();
        setError("Login failed: " + errorData.message);
      }
    }
    catch (error)
    {
      setError("Error during Logging in: "+ error.message);
    }
  };


  return (
    <div className="auth-page">
      <header>
        <h1>Login to Your Account</h1>
      </header>
      <main className="auth-main">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required />

          {passwordError && <p className="error-message">{passwordError}</p>}

          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>

          <button type="submit">Log in</button>
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

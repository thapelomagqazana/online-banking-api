import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './AuthPage.css';

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset password error when user is typing
    setPasswordError();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password match
    if (formData.password !== formData.confirmPassword)
    {
      setPasswordError("Passwords do not match");
      return;
    }

    // Add logic to check for strong password requirements
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!strongPasswordRegex.test(formData.password))
    {
      setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    // Send registration data to the server
    try
    {
      const response = await fetch("api/register", {
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
        console.log("Registration successful!");
      }
      else
      {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.message);
      }
    }
    catch (error)
    {
      console.error("Error during registration:", error.message);
    }
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
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>

          {passwordError && <p className="error-message">{passwordError}</p>}

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
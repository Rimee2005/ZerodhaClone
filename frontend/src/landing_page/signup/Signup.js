import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3002/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="form-main-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7fc',
        marginTop: "70px",
      }}
    >
      <div
        className="form_container"
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            marginBottom: '20px',
            fontSize: '24px',
            color: '#333',
          }}
        >
          Signup for an Account
        </h2>
        <form onSubmit={handleSignup}>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Enter your username"
              value={signupInfo.username}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '5px',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signupInfo.email}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '5px',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signupInfo.password}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '5px',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4e73df',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            Submit
          </button>
          <div className="footer-text" style={{ marginTop: '20px', fontSize: '14px' }}>
            <span>
              Already have an account?{' '}
              <Link to="/signup/login" style={{ color: '#4e73df', textDecoration: 'none' }}>
                Login here
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

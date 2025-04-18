import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user)); // yaad rakho
      navigate("/dashboard");
    } else {
      alert(data.error || "Login failed");
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
        backgroundColor: '#f7f9fc',
      }}
    >
      <div
        className="form_container"
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div
            style={{
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <label
              htmlFor="email"
              style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border 0.3s',
              }}
            />
          </div>
          <div
            style={{
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <label
              htmlFor="password"
              style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border 0.3s',
              }}
            />
          </div>
          <button
            type="submit"
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
            Login
          </button>
          <div
            style={{
              marginTop: '15px',
              fontSize: '14px',
              color: '#666',
            }}
          >
            <span>
              Don't have an account?{' '}
              <Link
                to="/signup/signup"
                style={{
                  color: '#4e73df',
                  textDecoration: 'none',
                }}
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

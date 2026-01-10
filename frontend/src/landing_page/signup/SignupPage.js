import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../config/api';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/user/register`, formData);
            console.log('✅ Signup successful:', response.data);
            
            // Save user data and token to localStorage
            const userData = {
                username: response.data.user.username,
                email: response.data.user.email,
                id: response.data.user.id
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', response.data.token);
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('❌ Signup failed:', err);
            const errorMessage = err.response?.data || err.message || 'Something went wrong. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className='container p-5 text-center mb-5 mt-5' style={{ marginTop: '100px' }}>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h1 className='mt-5 mb-4'>Sign Up</h1>
                    <p className='mb-4'>Create your Zerodha account</p>
                    
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input 
                                type='text' 
                                name='username'
                                className='form-control' 
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>
                        <div className='mb-3'>
                            <input 
                                type='email' 
                                name='email'
                                className='form-control' 
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <input 
                                type='password' 
                                name='password'
                                className='form-control' 
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>
                        <button 
                            type='submit' 
                            className='btn btn-primary w-100'
                            style={{ backgroundColor: '#387ED1' }}
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className='mt-3'>
                        Already have an account? <Link to='/login' style={{ color: '#387ED1' }}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default SignupPage;

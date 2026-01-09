import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const [formData, setFormData] = useState({
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
            const response = await axios.post('http://localhost:3002/api/user/login', formData);
            console.log('✅ Login successful:', response.data);
            
            // Save user data to localStorage
            const userData = {
                username: response.data.user.username,
                email: response.data.user.email,
                id: response.data.user._id
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('❌ Login failed:', err);
            console.error('❌ Error response:', err.response?.data);
            console.error('❌ Error status:', err.response?.status);
            
            let errorMessage = 'Invalid email or password. Please try again.';
            
            if (err.response) {
                // Handle validation errors or other backend errors
                if (err.response.data) {
                    if (typeof err.response.data === 'string') {
                        errorMessage = err.response.data;
                    } else if (err.response.data.message) {
                        errorMessage = err.response.data.message;
                    } else if (err.response.data.details && Array.isArray(err.response.data.details)) {
                        // Joi validation error
                        errorMessage = err.response.data.details[0]?.message || errorMessage;
                    } else if (err.response.data.error) {
                        errorMessage = err.response.data.error;
                    }
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            console.error('❌ Displaying error:', errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className='container p-5 text-center mb-5 mt-5' style={{ marginTop: '100px' }}>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h1 className='mt-5 mb-4'>Login</h1>
                    <p className='mb-4'>Sign in to your Zerodha account</p>
                    
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className='mt-3'>
                        Don't have an account? <Link to='/signup' style={{ color: '#387ED1' }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default LoginPage;


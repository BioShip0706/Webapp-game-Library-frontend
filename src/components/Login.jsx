import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

function Login() 
{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const signUpData =
    {
        username: username,
        password: password,
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) {
                // Registration successful
                alert('Login successful!');
                navigate('/'); // Redirect to login page
            } else {
                // Registration failed
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Your Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-prompt">
                    New here? <Link to="/register" className="login-link">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
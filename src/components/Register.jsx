import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

function Register() 
{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const signUpData =
    {
        username: username,
        name: firstName,
        surname: lastName,
        email: email,
        password: password
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) {
                // Registration successful
                alert('Registration successful! Please log in.');
                navigate('/login'); // Redirect to login page
            } else {
                // Registration failed
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Your Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="firstName">Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Surname</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" // Use type="email" for better validation
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
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
                    Already have an account? <Link to="/login" className="login-link">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
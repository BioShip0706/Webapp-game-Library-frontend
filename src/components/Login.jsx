import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

import { useContext } from 'react';
import { FavoriteContext } from '../store/FavoriteContext';
import Navbar from './Navbar';
import { AuthContext } from '../store/AuthContext';
import { useEffect } from 'react';

function Login() 
{
    const {jwtToken, setJwtToken} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
            if (jwtToken) 
            {
                navigate("/", { replace: true }); // oppure navigate("/login") 
            }
        }, [jwtToken,navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

        

    const signUpData =
    {
        username: username,
        password: password,
    };

    const {setUserId} = useContext(FavoriteContext)


    async function handleRegister(e)
    {
        e.preventDefault(); // eivta il refresh della pagina

        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) //ricevo un json
            { 
                const loginData = await response.json();
                // Login con succeso
                //alert('Login successful!');
                localStorage.setItem("token",loginData.token) //settare token 
                localStorage.setItem("username",loginData.username) //salvo anche username
                localStorage.setItem("id",loginData.id)
                setUserId(loginData.id)
                
                setJwtToken(loginData.token); //refresha il context

                navigate('/'); // Riporto alla home
            } 
            else //altrimento ricevo solo una stringa
            {
                // login failed
                const errorData = await response.text();
                setErrorMessage(errorData || "Credenziali errate");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.message)
        }
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="register-container">
            <div className="register-box">
                <h2>Login</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={4}
                            maxLength={15}
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
                            minLength={8}
                            maxLength={20}
                        />
                    </div>

                    {errorMessage && (<p className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>)}

                    <button type="submit" className="register-button">Login</button>

                </form>

                <p className="login-prompt">
                    Don't have an account? <Link to="/register" className="login-link">Register here</Link>
                </p>

            </div>
        </div>
        </>
    );
}

export default Login;
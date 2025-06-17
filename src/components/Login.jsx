import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

import { useContext } from 'react';
import { FavoriteContext } from '../store/FavoriteContext';

function Login() 
{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const signUpData =
    {
        username: username,
        password: password,
    };

    const {setUserId} = useContext(FavoriteContext)

    async function handleRegister(e)
    {
        e.preventDefault(); // Prevent default form submission

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
        <div className="register-container">
            <div className="register-box">
                <h2>Accedi</h2>
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

                    <button type="submit" className="register-button">Accedi</button>

                </form>

                <p className="login-prompt">
                    Sei un nuovo Utente? <Link to="/register" className="login-link">Registrati</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e) 
    {
        e.preventDefault();

        const signUpData = {
            username,
            name: firstName,
            surname: lastName,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) //ORA LOGIN AUTOMATICO
            {

                const signUpDataLogin = {
                    username,
                    password
                };

                //accesso con dati della registrazione
                const responseLogin = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpDataLogin)
                });

                if(responseLogin.ok)
                {
                    const loginData = await responseLogin.json();
                    localStorage.setItem("token",loginData.token)
                    localStorage.setItem("username",loginData.username)
                    navigate('/'); // Success: redirect to login

                }
            } 
            else 
            {
                const errorData = await response.text();
                //console.error('Errore durante la registrazione:'  + "dentro else");
                setErrorMessage(errorData || 'Compilare correttamente i campi!');
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Crea il tuo Account</h2>

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="firstName">Nome</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastName">Cognome</label>
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
                            type="email"
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

                    <button type="submit" className="register-button">Registrati</button>

                </form>

                <p className="login-prompt">
                    Hai già un account? <Link to="/login" className="login-link">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../Components/LoginCard/LoginCard';
import './LoginPage.css';

export const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (username: string, email: string, password: string) => {
        setError('');
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            navigate('/quiz', { replace: true });
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <LoginForm onSubmit={handleLogin} error={error} />
            </div>
        </div>
    );
};
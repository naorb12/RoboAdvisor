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
            const data = await response.json();
            localStorage.setItem("userId", data.user_id);
            console.log("User Id:", data.user_id)
            navigate('/quiz', { replace: true });
        } else {
            const data = await response.json();
            setError(data.detail || 'Login failed');
            console.error(data);
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
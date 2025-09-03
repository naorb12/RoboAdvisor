import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../Components/LoginCard/LoginCard';
import './LoginPage.css';

export const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log(localStorage.getItem("email") + " " + userId);
        if (userId) {
            navigate('/quiz', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (email: string, password: string) => {
        setError('');
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("userId", data.user_id);
            localStorage.setItem("email", data.email);
            console.log("User Id:", data.user_id);
            navigate('/quiz', { replace: true });
        } else {
            const data = await response.json();
            setError(data.detail || 'Login failed');
            console.error(data);
        }
    };

    const handleRegisterButton = () => {
        navigate('/register');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <LoginForm onSubmit={handleLogin} error={error} />
                <span className='register' onClick={handleRegisterButton}>Register</span>
            </div>
        </div>
    );
};


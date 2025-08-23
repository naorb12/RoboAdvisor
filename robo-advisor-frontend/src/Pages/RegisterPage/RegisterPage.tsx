import React, { useState, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../Components/RegisterCard/RegisterCard";
import "./RegisterPage.css";

export const RegisterPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string, confirmPassword: string) => {
        
        // Redirect if already logged in
        useEffect(() => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                navigate('/quiz', { replace: true });
            }
        }, [navigate]);
        
        setError('');
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirmPassword }),
        });
        if(response.ok){
            const data = await response.json();
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("email", data.email);
            navigate('/login', { replace: true });
        } else {
            const data = await response.json();
            setError(data.detail || 'Login failed');
            console.error(data);
        }
        };

    return (<div className="register-page">
        <div className="register-card">
            <h2>Register</h2>
            <RegisterForm onSubmit={handleRegister} error={error}/>
        </div>
    </div>);
};
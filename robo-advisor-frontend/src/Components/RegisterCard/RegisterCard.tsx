import { error } from "console";
import React, { use, useState } from "react";

export interface RegisterFormProps {
    onSubmit: (email: string, password: string, confirmPassword: string) => void;
    error?: string;
}

export const RegisterForm:  React.FC<RegisterFormProps> = ({onSubmit, error}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(email, password, confirmPassword);
        };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            {error && <div className="register-error">{error}</div>}
        </form>
    );
};
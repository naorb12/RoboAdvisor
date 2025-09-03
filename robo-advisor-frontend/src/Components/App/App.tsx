import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QuizPage } from '../../Pages/QuizPage/QuizPage';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { ProposalPage } from '../../Pages/ProposalPage/ProposalPage';
import { LoginPage } from '../../Pages/LoginPage/LoginPage';
import { RegisterPage } from '../../Pages/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

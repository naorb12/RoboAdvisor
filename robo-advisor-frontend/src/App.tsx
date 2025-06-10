import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QuizPage } from './Pages/QuizPage/QuizPage';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { ProposalPage } from './Pages/ProposalPage/ProposalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

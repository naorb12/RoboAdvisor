import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProposalCard } from '../../Components/ProposalCard/ProposalCard';
import { Header } from '../../Components/Structure/Header';
import './ProposalPage.css';

export const ProposalPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access the data passed via state
    const { proposal } = location.state || {};

    if (!proposal) {
        // If no data is passed, redirect back to the quiz page
        console.error("No proposal data found. Redirecting to /quiz.");
        navigate("/quiz");
        return null;
    }

    
    return (
        <div className="proposal-page">
            <Header />
            <h1>Your Investment Proposal</h1>
            <ProposalCard proposal={proposal} />
        </div>
    );
};

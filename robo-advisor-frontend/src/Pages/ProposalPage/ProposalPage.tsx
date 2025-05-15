import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProposalCard } from '../../Components/ProposalCard/ProposalCard';
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

    // Transform the data into the format expected by ProposalCard
    const portfolioData = proposal.portfolio.max_sharpe_portfolio[0]; // Assuming "max_sharpe_portfolio" is the key
    const transformedProposal = {
        title: "Max Sharpe Portfolio",
        description: "Balanced risk-return optimized via Markowitz model.",
        riskLevel: proposal.risk_profile,
        returns: portfolioData["Returns"],
        volatility: portfolioData["Volatility"],
        sharpeRatio: portfolioData["Sharpe Ratio"],
        suggestedAllocation: Object.keys(portfolioData)
            .filter((key) => key.endsWith("Weight"))
            .map((key) => ({
                asset: key.replace(" Weight", ""),
                percentage: parseFloat((portfolioData[key] * 100).toFixed(2)), // Convert weight to percentage as a number
            })),
    };

    return (
        <div className="proposal-page">
            <h1>Your Investment Proposal</h1>
            <ProposalCard proposal={transformedProposal} />
        </div>
    );
};

import { useLocation } from 'react-router-dom';
import { ProposalCard } from '../../Components/ProposalCard/ProposalCard';
import './ProposalPage.css';

export const ProposalPage = () => {
    const location = useLocation();
    // const proposal = location.state?.proposal;

    const mockProposal = {
        title: "Max Sharpe Portfolio",
        description: "Balanced risk-return optimized via Markowitz model.",
        riskLevel: "Moderate",
        returns: 11.91,
        volatility: 10.09,
        sharpeRatio: 1.18,
        suggestedAllocation: [
            { asset: "SPY", percentage: 13.8 },
            { asset: "QQQ", percentage: 1.31 },
            { asset: "IEI", percentage: 18.2 },
            { asset: "LQD", percentage: 0.97 },
            { asset: "TA35.TA", percentage: 19.51 },
            { asset: "GLD", percentage: 0.12 },
            { asset: "BTC-USD", percentage: 13.39 },
            { asset: "DBO", percentage: 14.61 },
            { asset: "IWM", percentage: 15.45 },
            { asset: "GSG", percentage: 2.78 }
        ]
    };
    const proposal = mockProposal;

    if (!proposal) {
        return (
            <div className="proposal-page">
                <h2>No proposal data received.</h2>
            </div>
        );
    }

    return (
        <div className="proposal-page">
            <h2>Suggested Investment Plan</h2>
            <ProposalCard proposal={proposal} />
        </div>
    );
};

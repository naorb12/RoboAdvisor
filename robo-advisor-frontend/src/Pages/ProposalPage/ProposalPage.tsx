import { ProposalCard } from '../../Components/ProposalCard/ProposalCard';
import './ProposalPage.css';

const mockProposal = {
    title: "Moderate Growth Portfolio",
    description: "A balanced mix of stocks and bonds suitable for medium-term investors with moderate risk tolerance.",
    riskLevel: "Moderate",
    suggestedAllocation: [
        { asset: "US Stocks", percentage: 40 },
        { asset: "International Stocks", percentage: 20 },
        { asset: "Bonds", percentage: 30 },
        { asset: "Cash", percentage: 10 }
    ]
};

export const ProposalPage = () => {
    return (
        <div className="proposal-page">
            <h2>Suggested Investment Plan</h2>
            <ProposalCard proposal={mockProposal} />
        </div>
    );
};


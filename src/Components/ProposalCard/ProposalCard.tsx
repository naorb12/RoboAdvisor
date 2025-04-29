import './ProposalCard.css';

type Props = {
    proposal: {
        title: string;
        description: string;
        riskLevel: string;
        suggestedAllocation: {
            asset: string;
            percentage: number;
        }[];
    };
};

export const ProposalCard = ({ proposal }: Props) => {
    return (
        <div className="proposal-card">
            <h3>{proposal.title}</h3>
            <p className="risk-level">
                Risk Level: <strong>{proposal.riskLevel}</strong>
            </p>
            <p>{proposal.description}</p>
            <ul>
                {proposal.suggestedAllocation.map((item, index) => (
                    <li key={index}>
                        {item.asset}: {item.percentage}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

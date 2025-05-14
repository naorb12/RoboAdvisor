import './ProposalCard.css';
import { Props, Proposal, Allocation } from '../../types/proposal.types';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const ProposalCard = ({ proposal }: Props) => {
    const COLORS = ['#cb9a06', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a9a9a9', '#ff6666', '#8dd1e1', '#d0ed57', '#83a6ed'];
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || payload.length === 0) return null;

        return (
            <div
                style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#000',
                    fontSize: '0.9rem',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <strong>{label}</strong>
                <div>{`${payload[0].name}: ${payload[0].value}%`}</div>
            </div>
        );
    };

    return (
        <div className="proposal-card">
            <h3>{proposal.title}</h3>
            <p className="risk-level">
                Risk Level: <strong>{proposal.riskLevel}</strong>
            </p>
            {proposal.returns !== undefined && (
                <p>Returns: {proposal.returns}%</p>
            )}
            {proposal.volatility !== undefined && (
                <p>Volatility: {proposal.volatility}%</p>
            )}
            {proposal.sharpeRatio !== undefined && (
                <p>Sharpe Ratio: {proposal.sharpeRatio}</p>
            )}
            <p>{proposal.description}</p>
            <ul>
                {proposal.suggestedAllocation.map((item, index) => (
                    <li key={index}>
                        {item.asset}: {item.percentage}%
                    </li>
                ))}
            </ul>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={proposal.suggestedAllocation}
                            dataKey="percentage"
                            nameKey="asset"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            labelLine={false}
                        >
                            {proposal.suggestedAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />


                    </PieChart>
                </ResponsiveContainer>

                <div className="pie-legend">
                    {proposal.suggestedAllocation.map((entry, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#333',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.9rem',
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: COLORS[index % COLORS.length],
                                    marginRight: 6
                                }}
                            />
                            {entry.asset}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

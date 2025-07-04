import React from 'react';
import './ProposalCard.css';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Helper function to transform backend proposal to UI format
function transformProposal(proposal: any) {
    // If already in UI format, just return
    if (proposal.suggestedAllocation) return proposal;

    // Detect backend format and transform
    let portfolioObj: Record<string, any> | null = null;
    let title = '';
    if (proposal.portfolio?.max_sharpe_portfolio) {
        portfolioObj = proposal.portfolio.max_sharpe_portfolio[0];
        title = 'Max Sharpe Portfolio';
    } else if (proposal.portfolio?.safest_portfolio) {
        portfolioObj = proposal.portfolio.safest_portfolio[0];
        title = 'Safest Portfolio';
    } else if (proposal.portfolio?.max_returns_portfolio) {
        portfolioObj = proposal.portfolio.max_returns_portfolio[0];
        title = 'Max Returns Portfolio';
    }

    if (!portfolioObj) return proposal;

    return {
        title,
        description: 'Portfolio generated by Markowitz optimization.',
        riskLevel: proposal.risk_profile,
        returns: portfolioObj['Returns'],
        volatility: portfolioObj['Volatility'],
        sharpeRatio: portfolioObj['Sharpe Ratio'],
        suggestedAllocation: Object.keys(portfolioObj!)
            .filter((key) => key.endsWith('Weight'))
            .map((key) => ({
                asset: key.replace(' Weight', ''),
                percentage: +(portfolioObj![key] * 100).toFixed(2),
            })),
    };
}

export const ProposalCard = ({ proposal }: { proposal: any }) => {
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

    // Transform if needed
    const transformed = transformProposal(proposal);

    return (
        <div className="proposal-card">
            <div className="proposal-flex">
                <div className="proposal-info">
                    <h3>{transformed.title}</h3>
                    <p className="risk-level">
                        Risk Level: <strong>{transformed.riskLevel}</strong>
                    </p>
                    {transformed.returns !== undefined && (
                        <p>Returns: {transformed.returns}%</p>
                    )}
                    {transformed.volatility !== undefined && (
                        <p>Volatility: {transformed.volatility}%</p>
                    )}
                    {transformed.sharpeRatio !== undefined && (
                        <p>Sharpe Ratio: {transformed.sharpeRatio}</p>
                    )}
                    <p>{transformed.description}</p>
                    <ul>
                        {transformed.suggestedAllocation.map((item: any, index: number) => (
                            <li key={index}>
                                {item.asset}: {item.percentage}%
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                            <Pie
                                data={transformed.suggestedAllocation}
                                dataKey="percentage"
                                nameKey="asset"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                labelLine={false}
                            >
                                {transformed.suggestedAllocation.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pie-legend">
                        {transformed.suggestedAllocation.map((entry: any, index: number) => (
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
        </div>
    );
};

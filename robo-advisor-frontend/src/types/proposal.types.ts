export type Allocation = {
    asset: string;
    percentage: number;
};

export type Proposal = {
    title: string;
    description: string;
    riskLevel: string;
    returns?: number;
    volatility?: number;
    sharpeRatio?: number;
    suggestedAllocation: Allocation[];
};

export type Props = {
    proposal: Proposal;
};
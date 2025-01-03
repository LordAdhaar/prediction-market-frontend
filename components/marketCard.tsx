interface MarketCardProps {
    index: number;
    filter: 'active' | 'pending' | 'resolved';
}

// Interface for the market data
interface Market {
    question: string;
    optionA: string;
    optionB: string;
    endTime: bigint;
    outcome: number;
    totalOptionAShares: bigint;
    totalOptionBShares: bigint;
    resolved: boolean;
}

// Interface for the shares balance
interface SharesBalance {
    optionAShares: bigint;
    optionBShares: bigint;
}
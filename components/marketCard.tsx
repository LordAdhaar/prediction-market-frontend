import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { predictionMarketContract } from "@/constants/contracts"
import { MarketProgress } from "./marketProgress";
import { MarketTime } from "./marketTime";
import { MarketCardSkeleton } from "./skeletonCards";
import { MarketResolved } from "./marketResolved";
import { MarketPending } from "./marketPending";
import { MarketBuyInterface } from "./marketBuyInterface";
import { MarketSharesDisplay } from "./marketSharesDisplay";

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

export function MarketCard({ index, filter }: MarketCardProps) {

    const account = useActiveAccount();

    const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
        contract: predictionMarketContract,
        method: "function getMarketInfo(uint256 _marketId) view returns (uint256 endTime, string question, string optionA, string optionB, uint256 totalOptionAShares, uint256 totalOptionBShares, bool resolved, uint8 outcome)",
        params: [BigInt(index)]
    });

    const market: Market | undefined = marketData ? {
        question: marketData[1],
        optionA: marketData[2],
        optionB: marketData[3],
        endTime: marketData[0],
        outcome: marketData[7],
        totalOptionAShares: marketData[4],
        totalOptionBShares: marketData[5],
        resolved: marketData[6],
    } : undefined;

    const { data: sharesBalanceData } = useReadContract({
        contract: predictionMarketContract,
        method: "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)",
        params: [BigInt(index), account?.address as string]
    });

    // Parse the shares balance
    const sharesBalance: SharesBalance | undefined = sharesBalanceData ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1]
    } : undefined;

    const isExpired = new Date(Number(market?.endTime) * 1000) < new Date();
    // Check if the market is resolved
    const isResolved = market?.resolved;
    const shouldShow = () => {
        if (!market) return false;

        switch (filter) {
            case 'active':
                return !isExpired;
            case 'pending':
                return isExpired && !isResolved;
            case 'resolved':
                return isExpired && isResolved;
            default:
                return true;
        }
    };

    // If the market should not be shown, return null
    if (!shouldShow()) {
        return null;
    }

    return (
        <Card key={index} className="flex flex-col">

            {isLoadingMarketData ? (
                <MarketCardSkeleton />

            ) : (
                <>
                    <CardHeader>
                        {market && <MarketTime endTime={market.endTime} />}
                        <CardTitle>{market?.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {market && (
                            <MarketProgress
                                optionA={market.optionA}
                                optionB={market.optionB}
                                totalOptionAShares={market.totalOptionAShares}
                                totalOptionBShares={market.totalOptionBShares}
                            />
                        )}
                        {new Date(Number(market?.endTime) * 1000) < new Date() ? (
                            market?.resolved ? (
                                <MarketResolved
                                    marketId={index}
                                    outcome={market.outcome}
                                    optionA={market.optionA}
                                    optionB={market.optionB}
                                />
                            ) : (
                                <MarketPending />
                            )
                        ) : (
                            <MarketBuyInterface
                                marketId={index}
                                market={market!}
                            />
                        )}
                    </CardContent>
                    <CardFooter>
                        {market && sharesBalance && (
                            <MarketSharesDisplay
                                market={market}
                                sharesBalance={sharesBalance}
                            />
                        )}
                    </CardFooter>
                </>
            )}
        </Card>
    )
}
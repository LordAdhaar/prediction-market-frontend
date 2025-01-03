"use client";

import { useReadContract } from "thirdweb/react"
import { Navbar } from "./navbar"
import { predictionMarketContract } from "@/constants/contracts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@/components/ui/tabs"
import { MarketCardSkeleton } from "@/components/skeletonCards"
import { MarketCard } from "@/components/marketCard"

export function PredictionMarketDashboard() {

    const { data: marketCount, isLoading: isLoadingMarketCount } = useReadContract({
        contract: predictionMarketContract,
        method: "function marketCount() returns (uint256)",
        params: [],
    });

    const skeletonCards = Array.from({ length: 6 }, (_, i) => (
        <MarketCardSkeleton key={`skeleton-${i}`} />
    ));


    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4">
                <Navbar />
                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="active"> Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending Resolution </TabsTrigger>
                        <TabsTrigger value="resolved">Resolved </TabsTrigger>
                    </TabsList>

                    {isLoadingMarketCount ? (
                        <TabsContent value="active" className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {skeletonCards}
                            </div>
                        </TabsContent>
                    ) : (
                        <>
                            <TabsContent value="active">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="active"
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="pending">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="pending"
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="resolved">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="resolved"
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </div>
        </div>
    )
}
"use client";
import { client } from "@/app/client";
import { tokenContract, tokenContractAddress } from "@/constants/contracts";
import { sepolia } from "thirdweb/chains";
import { prepareContractCall } from "thirdweb";
import { ConnectButton, lightTheme } from "thirdweb/react";
import {
    createWallet,
} from "thirdweb/wallets";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];

export function Navbar() {
    const account = useActiveAccount();
    const [isClaimLoading, setIsClaimLoading] = useState(false);
    const { mutateAsync: mutateTransaction } = useSendAndConfirmTransaction();
    const amount = 100000000000000000000;

    const claimTokens = async () => {
        setIsClaimLoading(true);
        try {
            // Add your token claiming logic here
            const tx = await prepareContractCall({
                contract: tokenContract,
                method: "function mint(address to, uint256 amount)",
                params: [account?.address as string, BigInt(amount)]
            });

            await mutateTransaction(tx);
            window.location.reload();

        } catch (error) {
            console.log(error);
        } finally {
            setIsClaimLoading(false);
        }
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Simple Prediction Market</h1>
            <div className="items-center flex gap-2">
                {account && (
                    <Button onClick={claimTokens} disabled={isClaimLoading}>
                        {isClaimLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Claiming...
                            </>
                        ) : (
                            'Claim Demo Tokens'
                        )}
                    </Button>
                )}
                <ConnectButton
                    client={client}
                    theme={lightTheme()}
                    detailsButton={{
                        displayBalanceToken: {
                            [sepolia.id]: tokenContractAddress
                        }
                    }}
                    chain={sepolia}
                    connectButton={{
                        style: {
                            fontSize: '0.75rem !important',
                            height: '2.5rem !important',
                        },
                        label: 'Sign In',
                    }}
                    wallets={wallets}
                />
            </div>
        </div>
    )
}
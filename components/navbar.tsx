"use client";
import { client } from "@/app/client";
import { tokenContractAddress } from "@/constants/contracts";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";
import {
    createWallet,
} from "thirdweb/wallets";
// import { useActiveAccount } from "thirdweb/react";
// import { Button } from "@/components/ui/button"

// import { useState } from "react";
// import { Loader2 } from "lucide-react";

const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
];

export function Navbar() {
    // const account = useActiveAccount();
    // const [isClaimLoading, setIsClaimLoading] = useState(false);
    // const { toast } = useToast();

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Simple Prediction Market</h1>
            <div className="items-center flex gap-2">
                {/* {account && (
                    <Button>
                        {isClaimLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Claiming...
                            </>
                        ) : (
                            'Claim Tokens'
                        )}
                    </Button>
                )} */}
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
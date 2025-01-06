import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const predictionMarketContractAddress = "0x298ae4684886e02d48cdfc82d75eb5f2c7921637";
export const tokenContractAddress = "0x08b5245dcf364c5532e779f4e3e6a6f54d4945fa";

export const predictionMarketContract = getContract({
    client: client,
    chain: sepolia,
    address: predictionMarketContractAddress,
})

export const tokenContract = getContract({
    client: client,
    chain: sepolia,
    address: tokenContractAddress,
})

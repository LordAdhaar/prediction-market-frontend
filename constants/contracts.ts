import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const predictionMarketContractAddress = "0x1996d02bb098837ad25c1a6ffe44da9ea0fbb1fd";
export const tokenContractAddress = "0xecc0933130ae3136cbec878b98bb00983f15fd1a";

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

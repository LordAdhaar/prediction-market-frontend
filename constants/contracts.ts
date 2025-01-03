import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const predictionMarketContractAddress = "0x80b37c19e31e43195e42ad4d17713dd5892238ca";
export const tokenContractAddress = "0xb4ce2d982de2e5fc90839c4c80b04bc7fb30f032";

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

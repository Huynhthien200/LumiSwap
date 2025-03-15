import Web3 from "web3";

const RPC_URL = "https://dream-rpc.somnia.network";
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

export default web3;

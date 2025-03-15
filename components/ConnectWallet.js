import { useState } from "react";
import Web3 from "web3";

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Chuyển mạng sang Somnia
        await switchToSomniaNetwork();

      } catch (error) {
        console.error("Kết nối ví thất bại:", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  };

  const switchToSomniaNetwork = async () => {
    const chainId = "0x..." // Thay bằng Chain ID của Somnia
    const rpcUrl = "https://rpc.somnia.io"; // RPC URL của Somnia

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                chainName: "Somnia",
                rpcUrls: [rpcUrl],
                nativeCurrency: {
                  name: "SOM",
                  symbol: "SOM",
                  decimals: 18
                }
              }
            ]
          });
        } catch (addError) {
          console.error("Thêm mạng Somnia thất bại:", addError);
        }
      } else {
        console.error("Chuyển mạng thất bại:", switchError);
      }
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
    >
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;

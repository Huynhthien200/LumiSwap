import { useEffect, useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const somniaChainId = "0xc488"; // Chain ID 50312 (hex)

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask!");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      await switchToSomniaNetwork();
    } catch (error) {
      console.error("Lỗi kết nối ví:", error);
    }
  };

  const switchToSomniaNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: somniaChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: somniaChainId,
                chainName: "Somnia Testnet",
                nativeCurrency: {
                  name: "Somnia Token",
                  symbol: "STT",
                  decimals: 18,
                },
                rpcUrls: ["https://dream-rpc.somnia.network/"],
                blockExplorerUrls: ["https://shannon-explorer.somnia.network/"],
              },
            ],
          });
        } catch (addError) {
          console.error("Lỗi thêm mạng Somnia:", addError);
        }
      } else {
        console.error("Lỗi chuyển mạng:", switchError);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || null);
      });
      window.ethereum.on("chainChanged", (chainId) => {
        if (chainId !== somniaChainId) {
          switchToSomniaNetwork();
        }
      });
    }
  }, []);

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
    >
      {walletAddress ? `Kết nối: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Kết nối ví"}
    </button>
  );
};

export default ConnectWallet;

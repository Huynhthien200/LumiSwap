import { useState, useEffect } from "react";
import Web3 from "web3";
import { switchToSomnia } from "../utils/network";
import { getBalance } from "../utils/balance";

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const balance = await getBalance(accounts[0]);
          setBalance(balance);
        } else {
          setAccount(null);
          setBalance(null);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        await switchToSomnia();
        const balance = await getBalance(accounts[0]);
        setBalance(balance);
      } catch (error) {
        console.error("Lỗi kết nối ví:", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask để sử dụng!");
    }
  };

  return (
    <div>
      {account ? (
        <div className="bg-gray-800 p-2 rounded-lg text-white">
          <p>Ví: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <p>Số dư: {balance} STT</p>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          Kết nối ví
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;

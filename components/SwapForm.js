import { useState } from "react";
import TokenSelector from "./TokenSelector";
import { performSwap } from "../utils/swap";
import { getBalance } from "../utils/balance";

const SwapForm = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("STT");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const tokens = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "STT", name: "Somnia Token" },
    { symbol: "USDT", name: "Tether" }
  ];

  const fetchBalance = async () => {
    if (account) {
      const userBalance = await getBalance(account, fromToken);
      setBalance(userBalance);
    }
  };

  const handleSwap = async () => {
    if (!account) {
      alert("Vui lòng kết nối ví!");
      return;
    }
    setLoading(true);
    try {
      await performSwap(account, fromToken, toToken, amount);
      alert("Swap thành công!");
      fetchBalance();
    } catch (error) {
      console.error("Lỗi swap:", error);
      alert("Swap thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-lg font-bold text-white">Swap Tokens</h2>

      <div className="mt-3">
        <label className="text-white">Số dư: {balance || "N/A"} {fromToken}</label>
        <button onClick={fetchBalance} className="ml-2 text-blue-400 underline">Cập nhật</button>
      </div>

      <input 
        type="number" 
        className="w-full p-3 mt-3 rounded bg-gray-800 text-white"
        placeholder="Nhập số lượng"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="mt-3">
        <label className="text-white">Từ:</label>
        <TokenSelector tokens={tokens} selectedToken={fromToken} onSelect={setFromToken} />
      </div>

      <div className="mt-3">
        <label className="text-white">Đến:</label>
        <TokenSelector tokens={tokens} selectedToken={toToken} onSelect={setToToken} />
      </div>

      <button 
        onClick={handleSwap} 
        className="mt-5 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Swap"}
      </button>
    </div>
  );
};

export default SwapForm;

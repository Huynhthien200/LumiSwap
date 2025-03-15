import { useState } from "react";
import TokenSelector from "./TokenSelector";

const SwapForm = () => {
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("DAI");
  const tokens = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "DAI", name: "Dai Stablecoin" },
    { symbol: "USDC", name: "USD Coin" }
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-lg font-bold text-white">Swap Tokens</h2>
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
      <button className="mt-5 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800">Swap</button>
    </div>
  );
};
export default SwapForm;

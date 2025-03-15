import { useState } from "react";

const TokenSelector = ({ tokens, selectedToken, onSelect }) => {
  const [search, setSearch] = useState("");

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(search.toLowerCase()) || 
    token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full p-2 border rounded-md bg-gray-800 text-white"
        placeholder="Tìm kiếm token..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute w-full bg-gray-900 border border-gray-700 rounded-md mt-1 max-h-40 overflow-y-auto">
        {filteredTokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelect(token.symbol)}
          >
            <img src={token.logo} alt={token.symbol} className="w-6 h-6 mr-2" />
            <span className="text-white">{token.name} ({token.symbol})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenSelector;

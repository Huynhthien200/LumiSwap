const TokenSelector = ({ tokens, selectedToken, onSelect }) => {
  return (
    <select 
      className="p-3 border rounded-md bg-gray-800 text-white"
      value={selectedToken}
      onChange={(e) => onSelect(e.target.value)}
    >
      {tokens.map((token) => (
        <option key={token.symbol} value={token.symbol}>{token.name}</option>
      ))}
    </select>
  );
};
export default TokenSelector;

'use client';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { MetaMaskProvider, useSDK } from '@metamask/sdk-react';

const SwapInterface = () => {
  const { sdk, connected, account } = useSDK();
  const [tokens, setTokens] = useState([]);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState('');

  // Contract Addresses
  const CONFIG = {
    SWAP_CONTRACT: process.env.NEXT_PUBLIC_SWAP_CONTRACT,
    WSTT: process.env.NEXT_PUBLIC_WSTT
  };

  const loadTokenList = async () => {
    const res = await fetch('/tokens.json');
    const data = await res.json();
    setTokens(data.tokens);
    setFromToken(data.tokens.find(t => t.symbol === 'STT'));
    setToToken(data.tokens.find(t => t.symbol === 'LUMI'));
  };

  const getSwapContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(
      CONFIG.SWAP_CONTRACT,
      [
        'function getAmountOut(uint256,uint256,uint256) view returns (uint256)',
        'function swap(address,address,uint256)'
      ],
      signer
    );
  };

  const calculateQuote = async () => {
    if (!fromToken || !toToken) return;
    
    const contract = await getSwapContract();
    const reserveIn = await contract.reserves(fromToken.address);
    const reserveOut = await contract.reserves(toToken.address);
    
    const amountIn = ethers.parseEther(amount);
    const amountOut = await contract.getAmountOut(
      amountIn,
      reserveIn,
      reserveOut
    );
    
    setQuote(ethers.formatEther(amountOut));
  };

  const executeSwap = async () => {
    try {
      const contract = await getSwapContract();
      const amountIn = ethers.parseEther(amount);
      
      const tx = await contract.swap(
        fromToken.address,
        toToken.address,
        amountIn
      );
      
      await tx.wait();
      alert('Swap thành công!');
    } catch (error) {
      console.error('Lỗi swap:', error);
    }
  };

  useEffect(() => {
    loadTokenList();
  }, []);

  return (
    <div className="swap-container">
      <div className="token-selectors">
        <select 
          value={fromToken?.address} 
          onChange={e => setFromToken(tokens.find(t => t.address === e.target.value))}
        >
          {tokens.map(token => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
        
        <span>→</span>
        
        <select
          value={toToken?.address}
          onChange={e => setToToken(tokens.find(t => t.address === e.target.value))}
        >
          {tokens.map(token => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <input
        type="number"
        placeholder="0.0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyUp={calculateQuote}
      />

      <div className="quote-display">
        Bạn sẽ nhận được: {quote} {toToken?.symbol}
      </div>

      <button
        onClick={connected ? executeSwap : () => sdk?.connect()}
        className="swap-button"
      >
        {connected ? `Swap (${account.slice(0,6)}...)` : "Kết nối Ví"}
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <MetaMaskProvider>
      <SwapInterface />
    </MetaMaskProvider>
  );
}

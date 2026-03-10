import React, { useState, useEffect } from 'react';

const Web3Badge = () => {
  const [blockNumber, setBlockNumber] = useState(21847293);
  const [copied, setCopied] = useState(false);

  // Simulate live block increments
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber(n => n + Math.floor(Math.random() * 3 + 1));
    }, 12000); // ~12s Ethereum block time
    return () => clearInterval(interval);
  }, []);

  const address = '0xA3f9...B2e7';
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="web3-identity-badge flex items-center gap-3 px-3 py-1.5 rounded-xl border border-[#3ce6f9]/20 bg-[#0a0a0f]/80 backdrop-blur-sm">
      {/* Status dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
      </span>

      {/* Chain icon + address */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs font-mono text-[#3ce6f9]/80 hover:text-[#3ce6f9] transition-colors"
        title="Copy address"
      >
        {/* ETH icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 1.5L3 12.5l9 5.5 9-5.5L12 1.5z" fill="#3ce6f9" opacity="0.8" />
          <path d="M3 12.5l9 5.5V8.5L3 12.5z" fill="#3ce6f9" opacity="0.5" />
          <path d="M21 12.5l-9 5.5V8.5l9 4z" fill="#3ce6f9" opacity="0.3" />
          <path d="M12 19.5L3 14l9 8.5 9-8.5-9 5.5z" fill="#3ce6f9" opacity="0.6" />
        </svg>
        <span>{copied ? 'Copied!' : address}</span>
      </button>

      {/* Block number */}
      <span className="text-xs font-mono text-gray-500">
        #{blockNumber.toLocaleString()}
      </span>
    </div>
  );
};

export default Web3Badge;

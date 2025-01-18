'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowsUpDown, FaChevronDown } from "react-icons/fa6";
import Link from 'next/link';
import { fetchTokenLists } from '@/services/tokenService';

const HeroSection = () => {
  const [tokens, setTokens] = useState([]);
  const [sellToken, setSellToken] = useState(null);
  const [buyToken, setBuyToken] = useState(null);
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [showSellDropdown, setShowSellDropdown] = useState(false);
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);

  useEffect(() => {
    const loadTokens = async () => {
      const fetchedTokens = await fetchTokenLists();
      setTokens(fetchedTokens);
      
      // Set default FOXEL token for buy section
      const foxelToken = fetchedTokens.find(token => token.symbol === 'FXL');
      if (foxelToken) {
        setBuyToken(foxelToken);
      }
    };
    loadTokens();
  }, []);

  useEffect(() => {
    // Automatically calculate buy amount when sell amount changes
    if (sellToken && buyToken && sellAmount) {
      const calculatedBuyAmount = (
        sellAmount * 
        (sellToken.basePrice / buyToken.basePrice)
      ).toFixed(6);
      setBuyAmount(calculatedBuyAmount);
    }
  }, [sellAmount, sellToken, buyToken]);

  const handleTokenSelect = (token, type) => {
    if (type === 'sell') {
      setSellToken(token);
      setShowSellDropdown(false);
      setShowBuyDropdown(false);
    } else {
      setBuyToken(token);
      setShowSellDropdown(false);
      setShowBuyDropdown(false);
    }
  };

  const toggleDropdown = (type) => {
    if (type === 'sell') {
      setShowSellDropdown(!showSellDropdown);
      setShowBuyDropdown(false);
    } else {
      setShowBuyDropdown(!showBuyDropdown);
      setShowSellDropdown(false);
    }
  };

  const handleSwapTokens = () => {
    // Swap tokens and amounts
    const tempSellToken = sellToken;
    const tempSellAmount = sellAmount;

    setSellToken(buyToken);
    setSellAmount(buyAmount);
    
    setBuyToken(tempSellToken);
    setBuyAmount(tempSellAmount);
  };

  const calculateBaseValue = (amount, token) => {
    return token ? (amount * token.basePrice).toFixed(2) : '0';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-black to-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Swap anytime, anywhere.</h1>

      <div className="bg-gray-900 rounded-3xl p-2 w-full max-w-xl shadow-lg relative">
        <div className="bg-gray-900 rounded-3xl p-2 border border-gray-700">
          <label className="block text-sm mb-1 pl-4 text-gray-400">Sell</label>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                disabled={!sellToken}
                className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('sell')}
                  className="flex items-center bg-[#00ff55db] hover:bg-[#00ff55] rounded-full px-3 py-2 text-slate-900 font-medium ml-2"
                >
                  <span className='text-xs w-max'>{sellToken ? sellToken.symbol : 'Select Token'}</span>
                  <FaChevronDown className="ml-2" />
                </button>
                {showSellDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {tokens
                      .filter(token => token.symbol !== buyToken?.symbol)
                      .map(token => (
                        <div 
                          key={token.address} 
                          onClick={() => handleTokenSelect(token, 'sell')}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {token.symbol} - {token.name}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="text-gray-400 pl-4 mt-2 text-sm self-end">
            {sellToken ? `Base Value: $${calculateBaseValue(sellAmount || 0, sellToken)}` : '$0'}
          </span>
        </div>

        <div 
          onClick={handleSwapTokens}
          className="absolute z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="bg-gray-700 hover:bg-gray-500 rounded-lg p-2 border-4 border-gray-900">
            <span className="text-2xl text-white"><FaArrowsUpDown /></span>
          </div>
        </div>

        <div className="mb-4 bg-gray-900 rounded-3xl p-2 border border-gray-700">
          <label className="block text-sm mb-1 pl-4 text-gray-400">Buy</label>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                disabled={!buyToken}
                className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('buy')}
                  className="flex items-center bg-[#00ff55db] hover:bg-[#00ff55] rounded-full px-3 py-2 text-slate-900 font-medium ml-2"
                >
                  <span className='text-xs w-max'>{buyToken ? buyToken.symbol : 'Select Token'}</span>
                  <FaChevronDown className="ml-2" />
                </button>
                {showBuyDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {tokens
                      .filter(token => token.symbol !== sellToken?.symbol)
                      .map(token => (
                        <div 
                          key={token.address} 
                          onClick={() => handleTokenSelect(token, 'buy')}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {token.symbol} - {token.name}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="text-gray-400 pl-4 mt-2 text-sm self-end">
            {buyToken ? `Base Value: $${calculateBaseValue(buyAmount || 0, buyToken)}` : '$0'}
          </span>
        </div>

        <Link href="/trade" className="w-full bg-[#00ff55db] text-black font-bold py-2 rounded-3xl hover:bg-[#00ff55] transition duration-200">
          <button 
            className="w-full font-bold py-2 rounded-lg hover:bg-[#00ff55] transition duration-200"
            disabled={!sellToken || !buyToken}
          >
            Get started
          </button>
        </Link>
      </div>

      <p className="mt-6 text-center text-gray-400">
        The largest onchain marketplace. Buy and sell crypto on Ethereum and 11+ other chains.
      </p>
    </div>
  );
};

export default HeroSection;
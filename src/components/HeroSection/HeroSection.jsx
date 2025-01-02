import React from 'react';
import { FaArrowsUpDown } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Swap anytime, anywhere.</h1>

      <div className="bg-gray-900 rounded-3xl p-2 w-full max-w-md shadow-lg">
        <div className="bg-gray-900 rounded-3xl p-2 border border-gray-700">
          <label className="block text-sm mb-1">Sell</label>
          <input
            type="number"
            placeholder="0"
            className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">$0</span>
            <button className="text-[#00ff55] hover:underline">Select token</button>
          </div>
        </div>

        <div className="absolute z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 cursor-pointer">
            <span className="text-2xl text-white"><FaArrowsUpDown /></span>
          </div>
        </div>

        <div className="mb-4 bg-gray-900 rounded-3xl p-2 border border-gray-700">
          <label className="block text-sm mb-1">Buy</label>
          <input
            type="number"
            placeholder="0"
            className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">$0</span>
            <button className="text-[#00ff55] hover:underline">Select token</button>
          </div>
        </div>

        <button className="w-full bg-[#00ff55] text-black font-bold py-2 rounded-lg hover:bg-[#00ff55db] transition duration-200">
          Get started
        </button>
      </div>

      <p className="mt-6 text-center text-gray-400">
        The largest onchain marketplace. Buy and sell crypto on Ethereum and 11+ other chains.
      </p>
    </div>
  );
};

export default HeroSection;
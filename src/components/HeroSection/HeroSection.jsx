import React from 'react';
import { FaArrowsUpDown, FaChevronDown } from "react-icons/fa6";
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-black to-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Swap anytime, anywhere.</h1>

      <div className="bg-gray-900 rounded-3xl p-2 w-full max-w-xl shadow-lg">
        <div className="bg-gray-900 rounded-3xl p-2 border border-gray-700">
          <label className="block text-sm mb-1 pl-4 text-gray-400">Sell</label>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0"
                className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button className="flex items-center bg-[#00ff55db] hover:bg-[#00ff55] rounded-full px-3 py-2 text-slate-900 font-medium ml-2">
                <span className='text-xs w-max'>Select Token</span>
                <FaChevronDown className="ml-2" />
              </button>
            </div>
          </div>
          <span className="text-gray-400 pl-4 mt-2 text-sm self-end">$0</span>
        </div>

        <div className="absolute z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gray-700 hover:bg-gray-500 rounded-lg p-2 border-4 border-gray-900 cursor-pointer">
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
                className="w-full text-5xl bg-gray-900 py-2 px-3 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button className="flex items-center bg-[#00ff55db] hover:bg-[#00ff55] rounded-full px-3 py-2 text-slate-900 font-medium ml-2">
                <span className='text-xs w-max'>Select Token</span>
                <FaChevronDown className="ml-2" />
              </button>
            </div>
          </div>
          <span className="text-gray-400 pl-4 mt-2 text-sm self-end">$0</span>
        </div>

        <Link href="/trade" className="w-full bg-[#00ff55] text-black font-bold py-2 rounded-lg hover:bg-[#00ff55db] transition duration-200">
          <button className="w-full bg-[#00ff55] text-black font-bold py-2 rounded-lg hover:bg-[#00ff55db] transition duration-200">
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
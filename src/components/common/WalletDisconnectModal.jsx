"use client";
import React from 'react';

const WalletDisconnectModal = ({ isOpen, onClose, onConfirmDisconnect, publicKey }) => {
  if (!isOpen) return null;

  const formatWalletAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Disconnect Wallet</h2>
        <p className="text-center mb-4">
          Are you sure you want to disconnect the wallet 
          <span className="font-bold ml-1">
            {formatWalletAddress(publicKey)}
          </span>?
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDisconnect}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletDisconnectModal;
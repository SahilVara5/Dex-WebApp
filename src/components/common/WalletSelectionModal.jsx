"use client";
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  TorusWalletAdapter 
} from '@solana/wallet-adapter-wallets';

const WalletSelectionModal = ({ isOpen, onClose }) => {
  const { wallets, select } = useWallet();

  const availableWallets = [
    {
      name: 'Phantom',
      adapter: PhantomWalletAdapter,
      icon: './assets/phantom-wallet-logo.png' // Use a web-hosted icon
    },
    {
      name: 'Solflare',
      adapter: SolflareWalletAdapter,
      icon: './assets/solfare-wallet-logo.png' // Use a web-hosted icon
    },
    {
      name: 'Torus',
      adapter: TorusWalletAdapter,
      icon: './assets/torus-wallet-logo.png' // Use a web-hosted icon
    }
  ];

  const handleWalletSelect = (walletName) => {
    try {
      // Find the selected wallet adapter
      const selectedWallet = wallets.find(
        wallet => wallet.adapter.name === walletName
      );

      if (selectedWallet) {
        // Select the wallet
        select(selectedWallet.adapter.name);
        onClose(); // Close the modal after selection
      } else {
        console.error(`Wallet ${walletName} not found`);
      }
    } catch (error) {
      console.error('Error selecting wallet:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Select a Wallet</h2>
        <div className="grid grid-cols-3 gap-4">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletSelect(wallet.name)}
              className="flex flex-col items-center p-4 border rounded hover:bg-gray-100 transition"
            >
              <img 
                src={wallet.icon} 
                alt={`${wallet.name} Wallet`} 
                className="w-16 h-16 mb-2 rounded-full"
              />
              <span>{wallet.name}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletSelectionModal;
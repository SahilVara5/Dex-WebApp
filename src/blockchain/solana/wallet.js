'use client';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  TorusWalletAdapter 
} from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletConnectionProvider = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  
  const wallets = useMemo(() => [
    new PhantomWalletAdapter({
      // Configure Phantom wallet adapter explicitly
      supportedTransactionVersions: ['legacy', 0],
    }),
    new SolflareWalletAdapter({
      supportedTransactionVersions: ['legacy', 0],
    }),
    new TorusWalletAdapter({
      supportedTransactionVersions: ['legacy', 0],
    })
  ], [network]);

  return (
    <ConnectionProvider endpoint={clusterApiUrl(network)}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
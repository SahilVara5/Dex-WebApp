import { useWallet } from '@solana/wallet-adapter-react';

export const useSolanaWallet = () => {
  const wallet = useWallet();

  return {
    ...wallet,
    isConnected: wallet.connected,
    publicKey: wallet.publicKey?.toBase58(),
    connect: wallet.connect,
    disconnect: wallet.disconnect
  };
};
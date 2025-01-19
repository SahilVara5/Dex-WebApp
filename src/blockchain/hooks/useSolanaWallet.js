import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';

export const useSolanaWallet = () => {
  const wallet = useWallet();

  const safeConnect = useCallback(async () => {
    try {
      if (!wallet.wallet) {
        console.error('No wallet selected');
        return;
      }
      await wallet.connect();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  }, [wallet.connect, wallet.wallet]);

  const safeDisconnect = useCallback(async () => {
    try {
      await wallet.disconnect();
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
    }
  }, [wallet.disconnect]);

  return {
    ...wallet,
    isConnected: wallet.connected,
    publicKey: wallet.publicKey?.toBase58(),
    connect: safeConnect,
    disconnect: safeDisconnect
  };
};
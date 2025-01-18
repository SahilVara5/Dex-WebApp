import { Connection, clusterApiUrl } from '@solana/web3.js';

export const getConnection = (network = 'devnet') => {
  const endpoint = clusterApiUrl(network);
  return new Connection(endpoint, 'confirmed');
};

export const createConnection = (customRpcUrl) => {
  if (customRpcUrl) {
    return new Connection(customRpcUrl, 'confirmed');
  }
  return getConnection();
};

export const getExplorerUrl = (txId, network = 'devnet') => {
  const baseUrl = network === 'mainnet-beta' 
    ? 'https://solscan.io/tx/' 
    : `https://solscan.io/tx/?cluster=${network}`;
  return `${baseUrl}${txId}`;
};
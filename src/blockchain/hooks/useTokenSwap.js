// import { useState, useEffect } from 'react';
// import { SwapService } from '@/services/swapService';
// import { TokenPriceService } from '@/services/tokenPriceService';
// import { useSolanaWallet } from './useSolanaWallet';

// export const useTokenSwap = () => {
//   const wallet = useSolanaWallet();
//   const [swapService] = useState(new SwapService());
//   const [priceService] = useState(new TokenPriceService());
  
//   const [tokenPrices, setTokenPrices] = useState({});
//   const [swapRates, setSwapRates] = useState({});

//   // Fetch real-time token prices
//   useEffect(() => {
//     const fetchTokenPrices = async () => {
//       const tokenIdMapping = priceService.getTokenIdMapping();
//       const tokenIds = Object.values(tokenIdMapping);
      
//       try {
//         const prices = await priceService.getTokenPrices(tokenIds);
//         if (prices) {
//           const formattedPrices = {};
//           Object.entries(tokenIdMapping).forEach(([symbol, id]) => {
//             formattedPrices[symbol] = prices[id]?.usd;
//           });
//           setTokenPrices(formattedPrices);
//         }
//       } catch (error) {
//         console.error('Failed to update token prices', error);
//       }
//     };

//     // Fetch immediately and then every 30 seconds
//     fetchTokenPrices();
//     const priceInterval = setInterval(fetchTokenPrices, 30000);

//     return () => clearInterval(priceInterval);
//   }, []);

//   // Calculate swap rates based on current prices
//   const calculateSwapRate = (fromToken, toToken, amount) => {
//     if (!tokenPrices[fromToken] || !tokenPrices[toToken]) return null;

//     const fromPrice = tokenPrices[fromToken];
//     const toPrice = tokenPrices[toToken];

//     return (amount * fromPrice) / toPrice;
//   };

//   // Perform token swap
//   const performSwap = async (fromToken, toToken, amount) => {
//     if (!wallet.isConnected) {
//       throw new Error('Wallet not connected');
//     }

//     try {
//       const swapResult = await swapService.swapTokens(
//         wallet.publicKey,
//         fromToken,
//         toToken,
//         amount
//       );

//       return {
//         success: true,
//         ...swapResult
//       };
//     } catch (error) {
//       console.error('Swap failed', error);
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   };

//   return {
//     tokenPrices,
//     calculateSwapRate,
//     performSwap,
//     isWalletConnected: wallet.isConnected
//   };
// };

import { useState, useCallback } from 'react';
import { SwapService } from '@/services/swapService';
import { TokenPriceService } from '@/services/tokenPriceService';
import { useSolanaWallet } from './useSolanaWallet';

export const useTokenSwap = () => {
  const { publicKey, connected } = useSolanaWallet();
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapError, setSwapError] = useState(null);
  const [swapResult, setSwapResult] = useState(null);

  const performSwap = useCallback(async (fromToken, toToken, amount) => {
    if (!connected || !publicKey) {
      setSwapError('Wallet not connected');
      return null;
    }

    setIsSwapping(true);
    setSwapError(null);

    try {
      // Estimate swap amount using on-chain price
      const estimatedAmount = await SwapService.estimateSwapAmount(
        fromToken, 
        toToken, 
        amount, 
        TokenPriceService
      );

      if (!estimatedAmount) {
        throw new Error('Unable to estimate swap amount');
      }

      // Perform actual token swap
      const result = await SwapService.swapTokens(
        publicKey, 
        fromToken, 
        toToken, 
        amount
      );

      setSwapResult(result);
      return result;
    } catch (error) {
      console.error('Swap failed:', error);
      setSwapError(error.message);
      return null;
    } finally {
      setIsSwapping(false);
    }
  }, [connected, publicKey]);

  const getTokenBalance = useCallback(async (tokenSymbol) => {
    if (!connected || !publicKey) {
      return null;
    }

    return await SwapService.getTokenBalance(publicKey, tokenSymbol);
  }, [connected, publicKey]);

  return {
    performSwap,
    getTokenBalance,
    isSwapping,
    swapError,
    swapResult
  };
};
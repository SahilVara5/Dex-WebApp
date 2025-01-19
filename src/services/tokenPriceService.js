import { PublicKey } from '@solana/web3.js';
import { getConnection } from '@/blockchain/solana/connection';

// Predefined Pyth price feed addresses for devnet
const getPriceFeedAddresses = () => {
  return {
    'SOL/USD': new PublicKey('J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix'),
    'BTC/USD': new PublicKey('HovQMDrbAgAYPCmHVSrezcSmkMtXSSVuHwUxvsgBkufq'),
    'ETH/USD': new PublicKey('EdVCmQ9iTdh1b7Gv8wDbbUqSTkNAiSyAzjWARNjRtoPT'),
    'USDC/USD': new PublicKey('Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJYat'),
    'USDT/USD': new PublicKey('38iouU7hVmRsVJxhQs6j4QsqMPAD4HTz2rPNmAv4zNAg')
  };
};

// Parse Pyth Price Feed
const parsePythPrice = (data) => {
  // Simplified parsing, might need more precise implementation
  const view = new DataView(data.buffer);
  const price = view.getFloat64(8, true);  // Example offset, might vary
  const confidence = view.getFloat64(16, true);  // Example offset

  return { price, confidence };
};

// Get Token Price
export const getTokenPrice = async (
  tokenSymbol, 
  connection = getConnection('devnet')
) => {
  try {
    const priceFeedAddresses = getPriceFeedAddresses();
    const priceFeedAddress = priceFeedAddresses[tokenSymbol];

    if (!priceFeedAddress) {
      throw new Error(`No price feed found for ${tokenSymbol}`);
    }

    // Fetch price data
    const accountInfo = await connection.getAccountInfo(priceFeedAddress);
    
    if (!accountInfo) {
      throw new Error(`Cannot fetch price for ${tokenSymbol}`);
    }

    // Parse Pyth price feed
    const parsedPrice = parsePythPrice(accountInfo.data);

    return {
      price: parsedPrice.price,
      confidence: parsedPrice.confidence
    };
  } catch (error) {
    console.error(`Error fetching price for ${tokenSymbol}:`, error);
    return null;
  }
};

// Get Multiple Token Prices
export const getMultipleTokenPrices = async (
  tokenSymbols, 
  connection = getConnection('devnet')
) => {
  const pricePromises = tokenSymbols.map(symbol => 
    getTokenPrice(symbol, connection)
  );

  const prices = await Promise.all(pricePromises);

  return tokenSymbols.reduce((acc, symbol, index) => {
    acc[symbol] = prices[index];
    return acc;
  }, {});
};

// Calculate Swap Rate
export const calculateSwapRate = async (
  fromToken, 
  toToken, 
  amount,
  connection = getConnection('devnet')
) => {
  try {
    const fromPrice = await getTokenPrice(`${fromToken}/USD`, connection);
    const toPrice = await getTokenPrice(`${toToken}/USD`, connection);

    if (!fromPrice || !toPrice) {
      throw new Error('Unable to fetch prices');
    }

    return (amount * fromPrice.price) / toPrice.price;
  } catch (error) {
    console.error('Swap rate calculation failed:', error);
    return null;
  }
};

// Main Token Price Service Object
export const TokenPriceService = {
  getTokenPrice,
  getMultipleTokenPrices,
  calculateSwapRate
};
export const POPULAR_TOKENS = [
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0a',
    name: 'Foxel',
    symbol: 'FXL',
    decimals: 18,
    chainId: 1,
    isFavorite: true,
    basePrice: 0.05
  },
  {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 18,
    chainId: 1,
    isFavorite: false,
    basePrice: 50000
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    chainId: 1,
    isFavorite: false,
    basePrice: 1
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    isFavorite: false,
    basePrice: 1
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    isFavorite: true,
    basePrice: 1
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    chainId: 1,
    isFavorite: true,
    basePrice: 50000
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    chainId: 1,
    isFavorite: false,
    basePrice: 2000
  },
  {
    address: '0x7Fc66500c84A76AD7e9c93437bfc5Ac33E2ddAC',
    name: 'Aave Token',
    symbol: 'AAVE',
    decimals: 18,
    chainId: 1,
    isFavorite: false,
    basePrice: 100
  },
  {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    name: 'ChainLink Token',
    symbol: 'LINK',
    decimals: 18,
    chainId: 1,
    isFavorite: false,
    basePrice: 20
  },
  {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F983',
    name: 'Maker',
    symbol: 'MKR',
    decimals: 18,
    chainId: 1,
    isFavorite: true,
    basePrice: 1000
  }
]

// Rest of the code remains the same
export const fetchTokenLists = async () => {
// Simulate async operation with sorting
return new Promise(resolve => {
  setTimeout(() => {
    // Sort tokens: favorites first, then alphabetically
    const sortedTokens = POPULAR_TOKENS.sort((a, b) => {
      // Favorites come first
      if (a.isFavorite && !b.isFavorite) return -1
      if (!a.isFavorite && b.isFavorite) return 1
      
      // Then sort alphabetically by symbol
      return a.symbol.localeCompare(b.symbol)
    })
    
    resolve(sortedTokens)
  }, 100)
})
}

export const searchTokens = (tokens, query) => {
if (!query || !tokens.length) return tokens

const normalizedQuery = query.toLowerCase().trim()

return tokens.filter(token => 
  token.symbol.toLowerCase().includes(normalizedQuery) ||
  token.name.toLowerCase().includes(normalizedQuery) ||
  token.address.toLowerCase().includes(normalizedQuery)
).slice(0, 10) // Limit to 10 results
}
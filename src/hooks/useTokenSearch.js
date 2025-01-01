import { useState, useEffect } from 'react'
import { fetchTokenLists, searchTokens } from '../services/tokenService'

export const useTokenSearch = () => {
  const [tokens, setTokens] = useState([])
  const [filteredTokens, setFilteredTokens] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTokens = async () => {
      setIsLoading(true)
      try {
        const fetchedTokens = await fetchTokenLists()
        setTokens(fetchedTokens)
        // Initially show all tokens, prioritizing favorites
        setFilteredTokens(fetchedTokens)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch tokens:', err)
        setError(err)
        setTokens([])
        setFilteredTokens([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTokens()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchTokens(tokens, searchQuery)
      setFilteredTokens(filtered)
    } else {
      // When query is empty, show all tokens with favorites first
      setFilteredTokens(tokens)
    }
  }, [searchQuery, tokens])

  return {
    tokens,
    filteredTokens,
    searchQuery,
    setSearchQuery,
    isLoading,
    error
  }
}
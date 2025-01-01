'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaStar } from 'react-icons/fa'
import { useTokenSearch } from '../../hooks/useTokenSearch'

const SearchToken = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)

  const searchContainerRef = useRef(null)
  const inputRef = useRef(null)

  const { filteredTokens, searchQuery, setSearchQuery } = useTokenSearch()

  useEffect(() => {
    // Check screen width and set mobile state
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 1100)
    }

    // Initial check
    checkScreenWidth()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenWidth)

    // Keyboard shortcut for search
    const handleKeyDown = (e) => {
      if (e.key === 'k' && e.ctrlKey) { // Check for Ctrl + K
        e.preventDefault(); // Prevent default behavior
        if (isSearchFocused) {
          setIsSearchFocused(false); // Unfocus if already focused
          document.getElementById('navbar-search')?.blur(); // Remove focus
        } else {
          setIsSearchFocused(true); // Focus if not focused
          document.getElementById('navbar-search')?.focus(); // Set focus
        }
      }
    }

    // Click outside handler
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false)
        setIsSearchFocused(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleClickOutside)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', checkScreenWidth)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchFocused])

  // Handle mobile search toggle
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
  }

  // Handle token selection
  const handleTokenSelect = (token) => {
    setSelectedToken(token)
    setSearchQuery(token.symbol)
    setIsDropdownVisible(false)
    console.log('Selected token:', token)
  }

  // Render token dropdown
  const renderTokenDropdown = () => {
    if (filteredTokens.length > 0 && isDropdownVisible) {
      return (
        <div className="absolute z-10 w-full mt-1 bg-[#023a24] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredTokens.map((token) => (
            <div 
              key={token.address} 
              className={`px-4 py-2 hover:bg-[#034a23] cursor-pointer flex items-center justify-between 
                ${token.isFavorite ? 'bg-[#025a33]' : ''} 
                ${selectedToken?.address === token.address ? 'bg-[#037a43]' : ''}`}
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex items-center">
                {token.isFavorite && (
                  <FaStar className="text-yellow-400 mr-2" />
                )}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">{token.symbol}</span>
                    <span className="text-sm text-gray-400">{token.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{token.address}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // If mobile, show search icon
  if (isMobile) {
    return (
      <div className="relative" ref={searchContainerRef}>
        {/* Search Icon */}
        <FaSearch 
          className='hover:cursor-pointer text-[#00ff55] hover:text-[#00ff55db]' 
          onClick={toggleMobileSearch} 
          size={24} 
        />

        {/* Mobile Search Popup */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative w-11/12 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                id="mobile-navbar-search"
                type="text"
                placeholder="Search tokens"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setIsDropdownVisible(true)
                }}
                onFocus={() => {
                  setIsSearchFocused(true)
                  setIsDropdownVisible(true)
                }}
                className="w-full pl-10 pr-12 py-3 bg-[#012a14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff55]"
              />
              <button
                onClick={toggleMobileSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                ✕
              </button>
              {renderTokenDropdown()}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full search bar for desktop
  return (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md" 
      ref={searchContainerRef}
    >
      <div className="relative flex items-center">
        <FaSearch className="absolute left-3 text-gray-400" />
        <input
          ref={inputRef}
          id="navbar-search"
          type="text"
          placeholder="Search tokens"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsDropdownVisible(true)
          }}
          onFocus={() => {
            setIsSearchFocused(true)
            setIsDropdownVisible(true)
          }}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full pl-10 pr-12 py-2 bg-[#012a14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff55]"
        />
        <span className="absolute right-3 text-gray-400 bg-[#034a23] px-2 py-1 rounded text-xs">
          Ctrl k
        </span>
      </div>
      {renderTokenDropdown()}
    </div>
  )
}

export default SearchToken
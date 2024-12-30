'use client'
import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchToken = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', checkScreenWidth)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchFocused])

  // Handle mobile search toggle
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
  }

  // If mobile, show search icon
  if (isMobile) {
    return (
      <div className="relative">
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
                id="mobile-navbar-search"
                type="text"
                placeholder="Search tokens"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-[#012a14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff55]"
              />
              <button
                onClick={toggleMobileSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full search bar for desktop
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="relative flex items-center">
        <FaSearch className="absolute left-3 text-gray-400" />
        <input
          id="navbar-search"
          type="text"
          placeholder="Search tokens"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full pl-10 pr-12 py-2 bg-[#012a14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff55]"
        />
        <span className="absolute right-3 text-gray-400 bg-[#034a23] px-2 py-1 rounded text-xs">
          Ctrl k
        </span>
      </div>
    </div>
  )
}

export default SearchToken
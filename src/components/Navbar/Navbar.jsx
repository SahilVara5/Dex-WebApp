"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  IoSettingsSharp,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import SearchToken from "../SearchToken/SearchToken";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [theme, setTheme] = useState("system"); // Default theme

  // Navigation links with active state
  const navLinks = [
    { href: "/trade", label: "Trade" },
    { href: "/explore", label: "Explore" },
    { href: "/pool", label: "Pool" },
  ];

  useEffect(() => {
    // Check screen width and set mobile state
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 530);
    };

    // Initial check
    checkScreenWidth();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    // Load theme from local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  // Apply the theme globally
  const applyTheme = (theme) => {
    document.body.className = ""; // Clear existing classes
    document.body.classList.add(theme); // Add the selected theme class
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[#020009] text-[#00ff55] relative">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center hover:no-underline">
          <Image src="/main-logo.svg" alt="Foxel Logo" width={48} height={48} />
          <span className="ml-2 text-2xl font-bold">Foxel</span>
        </Link>

        {/* Navigation Links for Desktop */}
        {!isMobile && (
          <div className="flex ml-10 space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-white"
                    : "text-[#8c8c8c] hover:text-[#e0e0e0]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Section: Search Icon (for mobile), Settings, and Wallet Connect */}
      <div className="flex items-center space-x-4">
        <SearchToken variant="icon" />

        {/* Settings Icon with Preferences Box */}
        <div className="relative">
          <IoSettingsSharp
            className="text-[#00ff55db] hover:text-[#00ff55] hover:cursor-pointer"
            size={24}
            onClick={() => setShowPreferences((prev) => !prev)} // Toggle preferences on click
          />
          {showPreferences && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4 z-50">
              <h3 className="font-bold mb-2">Global Preferences</h3>
              <div className="flex justify-between">
                <button
                  className={`flex-1 p-2 text-center ${theme === "system" ? "bg-[#00ff55] text-white" : "text-[#00ff55]"} rounded-l-lg`}
                  onClick={() => handleThemeChange("system")}
                >
                  System
                </button>
                <button
                  className={`flex-1 p-2 text-center ${theme === "light" ? "bg-[#00ff55] text-white" : "text-[#00ff55]"} `}
                  onClick={() => handleThemeChange("light")}
                >
                  Light
                </button>
                <button
                  className={`flex-1 p-2 text-center ${theme === "dark" ? "bg-[#00ff55] text-white" : "text-[#00ff55]"} rounded-r-lg`}
                  onClick={() => handleThemeChange("dark")}
                >
                  Dark
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        {isMobile ? (
          <button
            onClick={toggleMobileMenu}
            className="text-[#00ff55] hover:text-[#00ff55db]"
          >
            {isMenuOpen ? (
              <IoCloseOutline size={24} />
            ) : (
              <IoMenuOutline size={24} />
            )}
          </button>
        ) : (
          <>
            <button className="bg-[#00ff55db] hover:bg-[#00ff55] text-[#021207] px-4 py-2 rounded-full transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg">
              Connect
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-[#020009] z-50 flex flex-col items-center justify-start pt-10">

          <button
            onClick={toggleMobileMenu}
            className="fixed top-6 right-6 text-[#00ff55] hover:text-[#00ff55db]"
          >
            <IoCloseOutline size={24} />
          </button>

          <div className="flex flex-col items-center mb-6">
            <Link href="/" onClick={toggleMobileMenu} className="flex flex-col items-center">
              <Image src="/main-logo.svg" alt="Foxel Logo" width={48} height={48} />
              <span className="text-2xl font-bold text-[#00ff55]">Foxel</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={toggleMobileMenu}
                className={`block text-2xl
                  ${pathname === link.href 
                    ? 'text-white' 
                    : 'text-[#8c8c8c] hover:text-[#e0e0e0]'}
                `}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Additional Mobile Menu Items */}
            <div className="mt-6 space-y-4">
              <button 
                className="bg-[#00ff55db] hover:bg-[#00ff55] text-[#021207] px-6 py-3 rounded-full"
                onClick={toggleMobileMenu}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
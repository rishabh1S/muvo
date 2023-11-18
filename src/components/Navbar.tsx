"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { NavbarItem, MobileMenu, AccountMenu, SearchBar } from ".";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 lg:py-6 py-2 flex flex-row items-center transition duration-500 ${
          showBackground
            ? "bg-zinc-900/70 backdrop-blur-sm border-b border-solid border-gray-300 border-opacity-30 transition-opacity"
            : ""
        }`}
      >
        <img src="/images/logo.png" className="h-10 lg:h-14" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Movies" href="/" />
          <NavbarItem label="Series" href="/series" />
          <NavbarItem label="New & Popular" href="/newPopular" />
          <NavbarItem label="My List" href="/favlist" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <SearchBar />
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell size={22} className="w-6" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

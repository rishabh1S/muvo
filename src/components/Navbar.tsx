"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { NavbarItem, MobileMenu, AccountMenu, SearchBar } from ".";
import { usePathname, useRouter } from "next/navigation";
const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const pathName = usePathname() ?? "/";

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
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground
            ? "bg-zinc-900/70 backdrop-blur-sm border-b border-solid border-gray-300 border-opacity-30 transition-opacity"
            : ""
        }`}
      >
        <img src="/images/logo.png" className="h-6 lg:h-14" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" href="/" />
          <NavbarItem label="Movies" href="/movies" />
          <NavbarItem label="TV Shows" href="/shows" />
          <NavbarItem label="Favourites" href="/favlist" />
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
          <div className="relative">
            {showSearchBar ? (
              <div
                className={
                  "sm:relative fixed inset-0 sm:pt-0 pt-4 bg-neutral-950 sm:bg-opacity-0 bg-opacity-80 z-50"
                }
              >
                <SearchBar
                  router={router}
                  setShowSearchBar={setShowSearchBar}
                />
              </div>
            ) : (
              <AiOutlineSearch
                onClick={() => setShowSearchBar(true)}
                className="inline sm:w-6 sm:h-6 cursor-pointer text-neutral-200"
              />
            )}
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

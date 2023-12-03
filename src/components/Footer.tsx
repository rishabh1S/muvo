import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-gray-400">
      <div className="w-full p-10 space-y-4">
        <div className="">Questions? Call 000-400-080-1723</div>
        <div className="flex flex-wrap w-full">
          <div className="sm:w-1/4 w-1/2">
            <ul className="space-y-2">
              <li>FAQ </li>
              <li>Investor Relations</li>
              <li>Privacy</li>
              <li>Speed Test</li>
            </ul>
          </div>
          <div className="sm:w-1/4 w-1/2">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  passHref
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  passHref
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  passHref
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/favlist"
                  passHref
                  className="hover:text-gray-300 cursor-pointer"
                >
                  My List
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/4 w-1/2">
            <ul className="space-y-2">
              <li>Account </li>
              <li>Ways to Watch </li>
              <li>Corporate Information </li>
              <li>Nextflix Originals </li>
            </ul>
          </div>
          <div className="sm:w-1/4 w-1/2">
            <ul className="space-y-2">
              <li> Media Centre</li>
              <li>Terms of Use </li>
              <li>Contact Us </li>
            </ul>
          </div>
        </div>
        <div className="my-6 lg:my-8">
          <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center">
            ©{new Date().getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              NextFlix™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

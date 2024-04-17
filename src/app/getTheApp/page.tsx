"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SiExpo } from "react-icons/si";
import Image from "next/image";

export default function AppScreen() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden z-40">
      <div className="fixed inset-0 bg-cover -z-20 animate-float" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-l from-body to-body/60" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-body/80 via-body/30 to-transparent" />
      <nav className="w-full z-40 sm:px-12 px-2 py-5">
        <img src="/images/logo.png" className="h-6 lg:h-14" alt="Logo" />
      </nav>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-5 sm:grid-rows-1 grid-rows-7 grid-cols-1 sm:gap-24 gap-3">
          <div className="sm:col-span-2 col-span-1 sm:row-span-1 row-span-3 flex flex-col justify-center items-center sm:gap-4">
            <div className="text-white sm:text-6xl text-4xl font-bold">
              Get the App
            </div>
            <div className="py-2">
              <img
                src="/images/app_link.png"
                alt="App Link"
                className="sm:w-[350px] w-56"
              />
            </div>
            <button
              className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black hover:bg-gradient-to-br flex items-center py-2 sm:px-5 px-3 rounded-md w-fit cursor-pointer"
              onClick={() =>
                window.open("https://expo.dev/@rishabh1s/muvo", "_blank")
              }
            >
              <SiExpo className="text-white" />
              <div className="flex flex-col justify-start ml-4">
                <p className="text-white text-start font-normal text-xs">
                  View it on
                </p>
                <p className="text-white font-bold text-sm">Expo Store</p>
              </div>
            </button>
          </div>
          <div className="sm:col-span-3 col-span-1 sm:col-start-3 sm:row-span-1 row-span-4 row-start-4 flex flex-col justify-center gap-4 text-white sm:text-3xl text-xl px-2 py-4">
            <div className="flex items-center justify-center">
              <Image
                src="/images/mobile-display.png"
                width={600}
                height={600}
                alt="Picture of the author"
              />
            </div>
            <button
              className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-xl sm:px-8 px-4 sm:py-3 py-2 text-center"
              onClick={() => router.push("/")}
            >
              Continue on Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

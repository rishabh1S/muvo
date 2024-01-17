import React from "react";
import { NavbarItem } from ".";
import { useSession } from "next-auth/react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const session = useSession();
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-36 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white">
          <NavbarItem label="Home" href="/" />
        </div>
        <div className="px-3 text-center text-white">
          <NavbarItem label="Movies" href="/movies" />
        </div>
        <div className="px-3 text-center text-white">
          <NavbarItem label="Tv Shows" href="/shows" />
        </div>
        <div className="px-3 text-center text-white">
          {session?.status === "authenticated" && (
            <NavbarItem label="Favourites" href="/favlist" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

import React from "react";
import { NavbarItem } from ".";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-36 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white">
          <NavbarItem label="Movies" href="/movies" />
        </div>
        <div className="px-3 text-center text-white">
          <NavbarItem label="Series" href="/series" />
        </div>
        <div className="px-3 text-center text-white">
          <NavbarItem label="My List" href="/favlist" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

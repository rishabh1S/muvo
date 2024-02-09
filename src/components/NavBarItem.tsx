import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavbarItemProps {
  label: string;
  href: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive
          ? "text-white cursor-default border-b border-lime-500"
          : "text-gray-200 hover:text-lime-500 cursor-pointer"
      } transition-transform duration-500 ease-in-out transform-gpu hover:translate-y-0.5}`}
    >
      {label}
    </Link>
  );
};

export default NavbarItem;

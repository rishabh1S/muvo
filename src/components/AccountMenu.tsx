import { signOut } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  showAccountMenu: boolean;
  setShowAccountMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  showAccountMenu,
  setShowAccountMenu,
}) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };

    if (showAccountMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showAccountMenu, setShowAccountMenu]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("Failed to sign out");
    }
  };

  if (!showAccountMenu) {
    return null;
  }

  const handleClick = currentUser ? handleSignOut : () => router.push("/auth");

  const buttonText = currentUser ? "Sign out of Muvo" : "Sign in to Muvo";

  return (
    <div
      ref={menuRef}
      className="bg-body/80 rounded-md w-56 absolute top-10 sm:top-14 right-0 py-5"
    >
      <div className="flex flex-col gap-3">
        <div className="px-3 flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src={currentUser?.image || "/images/default-blue.png"}
            alt=""
          />
          <p className="text-white text-sm cursor-default">
            {currentUser?.name || "Guest"}
          </p>
        </div>
      </div>
      <hr className="bg-gray-300/30 border-0 h-px my-4" />
      <div
        onClick={handleClick}
        className="px-3 text-center text-white hover:text-lime-400 text-sm hover:underline"
      >
        {buttonText}
      </div>
    </div>
  );
};

export default AccountMenu;

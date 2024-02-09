import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  visible?: boolean;
}

const handleSignOut = async () => {
  try {
    await signOut();
    toast.success("Successfully signed out");
  } catch (error) {
    console.error("Sign-out error:", error);
    toast.error("Failed to sign out");
  }
};

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  if (!visible) {
    return null;
  }

  const handleClick = currentUser ? handleSignOut : () => router.push("/auth");

  const buttonText = currentUser ? "Sign out of Muvo" : "Sign in to Muvo";

  return (
    <div className="bg-neutral-950/90 w-56 absolute top-10 sm:top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          <p className="text-white text-sm cursor-default">
            {currentUser?.name || "Guest"}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
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

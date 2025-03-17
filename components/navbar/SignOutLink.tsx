"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogout = () => {
    toast("Event has been created",
      { description: "You have been signed out." }
    );
  };

  return (
    <SignOutButton redirectUrl='/'>
      <button className='w-full text-left' onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;

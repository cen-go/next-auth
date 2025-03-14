"use client"

import { signOutAction } from "@/actions/login";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export default function LogoutButton({children}: LogoutButtonProps) {
  function handleLogout() {
    signOutAction();
  }

  return (
    <span onClick={handleLogout} className="cursor-pointer">
      {children}
    </span>
  )
}
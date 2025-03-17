"use client"

import { FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LogoutButton from "./logout-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>
            <FaUserCircle  className="w-10 h-10 text-indigo-400"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            Log out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
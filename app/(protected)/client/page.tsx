"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserInfo from "@/components/user-info";

export default function ServerPage() {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo label="💻 Client component" user={user} />
    </div>
  )
}
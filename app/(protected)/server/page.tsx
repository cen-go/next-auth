import { currentUser } from "@/lib/getCurrentUser"
import UserInfo from "@/components/user-info";

export default async function ServerPage() {
  const user = await currentUser();

  return (
    <div>
      <UserInfo label="💽 Server component" user={user} />
    </div>
  )
}
import { auth } from "@/auth";

import { signOutAction } from "@/actions/login";
import { Button } from "@/components/ui/button";

async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form action={signOutAction}>
        <Button
          type="submit"
          size="lg"
          variant="default"
          className="cursor-pointer"
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}

export default SettingsPage;

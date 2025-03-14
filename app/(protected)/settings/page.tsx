"use client";

// import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOutAction } from "@/actions/login";
import { Button } from "@/components/ui/button";

function SettingsPage() {
  // const user = useCurrentUser();

  return (
    <div className="bg">
      <Button
        onClick={signOutAction}
        type="submit"
        size="lg"
        variant="secondary"
      >
        Sign out
      </Button>
    </div>
  );
}

export default SettingsPage;

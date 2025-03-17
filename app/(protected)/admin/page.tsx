"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adminAction } from "@/actions/admin";

export default function AdminPage() {
  const role = useCurrentRole();

  function handleApiRouteClick() {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API route.");
      } else {
        toast.error("Forbidden API route!");
      }
    });
  }

  async function handleServerActionClick() {
    const result = await adminAction();

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🗝️ Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="You are allowed to see this content." />
          <p>User role: {role}</p>
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={handleApiRouteClick} className="cursor-pointer">
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={handleServerActionClick} className="cursor-pointer">
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import FormError from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return (
    <>{children}</>
  )
}

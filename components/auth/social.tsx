"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  function handleSignIn(provider: "google" | "github") {
    signIn(provider,{
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-2">
      <Button
        size="lg"
        variant="outline"
        className="flex-grow cursor-pointer"
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="flex-grow cursor-pointer"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
}

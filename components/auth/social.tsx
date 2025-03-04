"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-2">
      <Button
        size="lg"
        variant="outline"
        className="flex-grow cursor-pointer"
        onClick={() => {}}
      >
        <FcGoogle />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="flex-grow cursor-pointer"
        onClick={() => {}}
      >
        <FaGithub />
      </Button>
    </div>
  );
}

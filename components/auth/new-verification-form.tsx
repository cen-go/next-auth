"use client"

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import CardWrapper from "./card-wrapper"
import { verifyEmailAction } from "@/actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = useCallback(async () => {
    if (!token) {
      setError("Token is missing!");
    } else {
      try {
        const data = await verifyEmailAction(token);
        setError(data?.error);
        setSuccess(data?.success);
      } catch {
        setError("An error occured!");
      }
    }
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {(!error && !success) && <BeatLoader color="#7373FF" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
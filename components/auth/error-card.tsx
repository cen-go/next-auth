import CardWrapper from "./card-wrapper";
import { MdError } from "react-icons/md";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center text-destructive">
        <MdError className="w-7 h-7" />
      </div>
    </CardWrapper>
  );
}
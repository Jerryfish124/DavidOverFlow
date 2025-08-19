import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const SignedStatus = () => {
  return (
    <SignedIn>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-10 w-10",
          },
          variables: {
            colorPrimary: "#ff7000",
          },
        }}
      />
    </SignedIn>
  );
};

export default SignedStatus;

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="mt-3 flex flex-col flex-wrap gap-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3
          className="h1-bold text-center text-lg  leading-6 text-gray-900 "
          id="modal-title"
        >
          Use Test Credentials
        </h3>
        <div className="m-2">
          <p className="w-full text-sm text-gray-500">
            Please log in using these test credentials:
            <br />
            Email: demo@test.com Username: demo Password: 123456
            <br />
            Click on the &quot;Sign in&quot; button below and follow the
            instructions <br />
            to log in without creating an account.
          </p>
        </div>
      </div>
      <SignUp />
    </>
  );
}

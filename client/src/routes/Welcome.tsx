import MaterialSymbolsAppRegistration from "@/components/svg/MaterialSymbolsAppRegistration.tsx";
import MaterialSymbolsLogin from "@/components/svg/MaterialSymbolsLogin.tsx";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <main className="flex justify-center items-center p-4 flex-col gap-36">
      <h1 className="text-3xl">
        Welcome to{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-500 to-amber-600">
          Fake Stack Overflow
        </span>
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="rounded-2xl w-96 bg-amber-100 p-10 flex flex-col justify-between gap-3">
          <MaterialSymbolsAppRegistration
            color="#e7700d"
            width="64"
            height="64"
            className="self-center"
          />
          <h2 className="w-max text-xl self-center">Join the community!</h2>
          <Link
            to="/users/register"
            className="rounded bg-amber-600 text-white p-2 text-center hover:bg-amber-700"
          >
            Sign Up
          </Link>
        </div>
        <div className="rounded-2xl w-96 bg-blue-100 p-10 flex flex-col justify-between gap-3">
          <MaterialSymbolsLogin
            color="#1b75d0"
            width="64"
            height="64"
            className="self-center"
          />
          <h2 className="w-max text-xl self-center">
            Already have an account?
          </h2>
          <Link
            to="/users/login"
            className="rounded bg-blue-600 text-white p-2 text-center hover:bg-blue-700"
          >
            Log In
          </Link>
        </div>
        <Link
          to="/questions"
          className="col-span-2 h-fit border-2 border-gray-400 rounded p-2 text-center hover:bg-gray-400 hover:text-white"
        >
          Continue As Guest
        </Link>
      </div>
    </main>
  );
}

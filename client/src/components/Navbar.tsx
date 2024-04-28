import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed w-full border-b border-gray-200">
      <header className="p-2 flex items-center gap-4 justify-between h-14 w-[1264px] m-auto">
        <Link to="/" className="font-bold text-xl">
          Fake Stack Overflow
        </Link>
        <div className="flex items-center flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md border-gray-300 w-full"
          />
        </div>
        <div>
          <ol className="flex gap-2">
            <NavLink
              to="/users/login"
              className="border border-blue-700 p-2 rounded text-blue-600 hover:bg-blue-200 focus:outline-none"
            >
              Log In
            </NavLink>
            <NavLink
              to="/users/signup"
              className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700"
            >
              Sign Up
            </NavLink>
          </ol>
        </div>
      </header>
    </div>
  );
}

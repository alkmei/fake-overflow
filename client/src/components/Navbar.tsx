import { Link, NavLink } from "react-router-dom";
import { IconBrandStackoverflow, IconSearch } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <div className="fixed w-full border-b border-gray-200 bg-white z-50 border-t-[3px] border-t-[#e7700d]">
      <header className="flex items-center gap-4 justify-between h-14 max-w-[1264px] m-auto">
        <Link
          to="/"
          className="text-xl flex items-center hover:bg-gray-200 h-full px-2 rounded"
        >
          <IconBrandStackoverflow width={32} height={32} color="#e7700d" />
          fake <span className="font-bold ml-0.5">overflow</span>
        </Link>
        <div className="flex items-center flex-grow">
          <div className="border p-2 rounded-md border-gray-300 w-full flex gap-1 focus-within:outline-double outline-blue-200">
            <label htmlFor="search">
              <IconSearch width={18} color="gray" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-full relative outline-none"
            />
          </div>
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

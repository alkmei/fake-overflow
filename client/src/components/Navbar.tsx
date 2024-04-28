import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="p-2 flex justify-between items-center border-b border-gray-200">
      <div className="font-bold text-2xl">Fake Stack Overflow</div>
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md border-gray-200"
        />
        <nav>
          <ol className="flex gap-2">
            <NavLink
              to="/users/register"
              className="border border-blue-700 p-2 rounded text-blue-600 hover:bg-blue-200 focus:outline-none"
            >
              Log In
            </NavLink>
            <NavLink
              to="/users/login"
              className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700"
            >
              Sign Up
            </NavLink>
          </ol>
        </nav>
      </div>
    </header>
  );
}

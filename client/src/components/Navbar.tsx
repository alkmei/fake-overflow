import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="p-2 flex items-center border-b border-gray-200 gap-4 justify-between">
      <div className="font-bold text-2xl">Fake Stack Overflow</div>
      <nav>
        <ol className="flex items-center gap-2">
          <NavLink
            to="/questions"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700"
            }
          >
            Questions
          </NavLink>
          <NavLink
            to="/tags"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700"
            }
          >
            Tags
          </NavLink>
        </ol>
      </nav>
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
      </div>
    </header>
  );
}

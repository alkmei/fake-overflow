import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const style: string = "rounded-l p-2";
    return isActive
      ? style.concat(" ", "bg-gray-300 font-bold")
      : style.concat(" ", "hover:bg-gray-200");
  };
  return (
    <nav className="w-40 min-h-[calc(100vh-56px)] border-r">
      <ol className="flex flex-col mt-4 gap-4">
        <NavLink to="/questions" className={linkClass}>
          Questions
        </NavLink>
        <NavLink to="/tags" className={linkClass}>
          Tags
        </NavLink>
      </ol>
    </nav>
  );
}

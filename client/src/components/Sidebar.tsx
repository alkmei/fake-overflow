import { NavLink } from "react-router-dom";
import { IconHelpHexagon, IconTags } from "@tabler/icons-react";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const style: string = "rounded-l p-2 flex items-center gap-1";
    return isActive
      ? style.concat(" ", "bg-gray-300 font-bold")
      : style.concat(" ", "hover:bg-gray-200");
  };
  return (
    <nav className="w-40 min-h-[calc(100vh-56px)] border-r">
      <ol className="flex flex-col mt-4 gap-1">
        <NavLink to="/questions" className={linkClass}>
          <IconHelpHexagon
            width={16}
            height={16}
            className="translate-y-[0.5px]"
          />
          Questions
        </NavLink>
        <NavLink to="/tags" className={linkClass}>
          <IconTags width={16} height={16} className="translate-y-[0.5px]" />
          Tags
        </NavLink>
      </ol>
    </nav>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "@/components/Sidebar.tsx";

export default function Content() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1264px] m-auto relative top-14 flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

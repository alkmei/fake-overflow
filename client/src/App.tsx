import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50">
        <div className="m-4 mt-16">
          <Outlet />
        </div>
      </div>
    </>
  );
}

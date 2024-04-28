import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="m-4 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}

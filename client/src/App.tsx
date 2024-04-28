import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { CURRENT_PAGE } from "./constants/page";

export default function Layout() {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];

  return (
    <div className="flex h-full flex-1 flex-row bg-gray-50">
      <Sidebar />

      <div className="flex min-h-screen w-full flex-col">
        <Header title={CURRENT_PAGE[pathName]} />
        <Outlet />
      </div>
    </div>
  );
}

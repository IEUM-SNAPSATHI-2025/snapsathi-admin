import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { CURRENT_PAGE } from "./constants/page";

export default function Layout() {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-full flex-1 flex-row bg-gray-50">
      {/* PC 사이드바 */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* 모바일&태블릿 사이드바 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        >
          <div
            className="absolute left-0 top-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen w-full flex-col">
        <Header
          title={CURRENT_PAGE[pathName]}
          onHamburgerClick={toggleSidebar}
        />
        <Outlet />
      </div>
    </div>
  );
}

import logoIcon from "@assets/simba.jpg";

import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose(); // 모바일에서 사이드바 닫기
  };

  return (
    <aside className="flex h-full w-fit flex-col items-start justify-between gap-8 bg-[#0E1B6B] pb-11">
      <div>
        <header className="flex w-48 shrink-0 items-center justify-center p-2 text-white md:w-48">
          <img className="" src={logoIcon}></img>
        </header>

        <nav className="flex flex-col items-start justify-start gap-6 p-5 text-white">
          <h2 className="font-semibold">SNAPSATHI</h2>
          <div className="flex w-full flex-col items-start justify-start gap-3 pl-3">
            <button
              className="w-full p-1 text-start hover:bg-white/10"
              onClick={() => handleNavigate("/")}
            >
              📋 예약 목록
            </button>
            <button
              className="w-full p-1 text-start hover:bg-white/10"
              onClick={() => handleNavigate("/inquiry")}
            >
              💬 고객 문의
            </button>
          </div>
        </nav>
      </div>

      <div className="p-4 text-sm text-gray-300">
        {user ? (
          <div>👤 {user.user_metadata?.name || user.email}</div>
        ) : (
          <div>로그인되지 않음</div>
        )}
      </div>
    </aside>
  );
}

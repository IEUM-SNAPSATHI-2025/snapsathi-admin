import logoIcon from "@assets/simba.jpg";

import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <div>
      <aside className="flex h-full flex-col items-start gap-8 bg-[#0E1B6B]">
        <header className="flex w-full shrink-0 items-center justify-center p-2 text-white">
          <img className="w-[200px]" src={logoIcon}></img>
        </header>
        <nav className="flex flex-col items-start justify-center gap-6 p-5 text-white">
          <button onClick={() => navigate("/reservation")}>예약 목록</button>
          <button onClick={() => navigate("/reservation-inquiry")}>
            고객 문의
          </button>
        </nav>

        {/* 로그인 유저 정보 표시 */}
        {/* //TODO 추후 위치 조정 */}
        <div className="p-4 text-sm text-gray-300">
          {user ? (
            <div>👤 {user.user_metadata?.name || user.email}</div>
          ) : (
            <div>로그인되지 않음</div>
          )}
        </div>
      </aside>
    </div>
  );
}

import meatballIcon from "@assets/meatball.svg";
import { useEffect, useRef, useState } from "react";

//TODO: 추후 재사용 가능하도록 리팩토링 예정
export default function MoreActionsDropdown({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label="더보기 메뉴 열기"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2"
      >
        <img className="h-6 w-6" src={meatballIcon} alt="" aria-hidden="true" />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-24 rounded bg-white shadow-md">
          <button
            type="button"
            aria-label="수정"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            수정
          </button>
          <button
            type="button"
            aria-label="삭제"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

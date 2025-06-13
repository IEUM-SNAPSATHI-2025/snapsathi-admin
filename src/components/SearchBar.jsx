import searchIcon from "@assets/search.svg";

export default function SearchBar({ inputValue, onChange }) {
  return (
    <>
      <div role="search" className="flex items-center">
        <div className="relative w-full">
          <input
            className="h-[40px] w-full rounded-[6px] border-[1.3px] pl-10 shadow-sm"
            type="text"
            placeholder="검색어를 입력해주세요"
            value={inputValue}
            onChange={onChange}
          />
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            src={searchIcon}
            alt="검색하기"
          />
        </div>
      </div>
    </>
  );
}

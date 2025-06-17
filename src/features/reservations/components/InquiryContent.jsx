import Pagination from "@components/Pagination";
import SearchBar from "@components/SearchBar";
import useDebounce from "@hooks/useDebounce";
import usePagination from "@hooks/usePagination";
import { useEffect, useState } from "react";
import InquiryList from "../components/InquiryList";
import { PAGE_LIMIT } from "../constants/reservation";
import useGetInquiries from "../hooks/useGetInquiries";

const titleItems = {
  id: "예약번호",
  name: "이름",
  message: "문의내용",
  created_at: "작성일(한국 기준)",
};

export default function InquiryContent() {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedKeyword = useDebounce(searchKeyword, 300);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const {
    data: { data: inquiryData = [], count = 0 } = {},
    isLoading,
    isError,
    error,
  } = useGetInquiries({
    page,
    limit: PAGE_LIMIT,
    keyword: debouncedKeyword,
  });

  const {
    totalPages,
    pageNumbers,
    groupStart,
    groupEnd,
    goToPrevGroup,
    goToNextGroup,
  } = usePagination({
    totalCount: count,
    pageLimit: PAGE_LIMIT,
    currentPage: page,
    setCurrentPage: setPage,
  });

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  if (isError) {
    return (
      <div role="alert">
        문의 목록을 불러오는 데 실패했습니다: {error.message}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <SearchBar
        inputValue={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <div className="flex h-fit min-h-[43rem] w-full flex-col justify-between gap-4 rounded-xl bg-white px-4 py-6 text-black md:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2 text-base font-medium text-gray-400">
              {Object.entries(titleItems).map(([key, title]) => (
                <div
                  key={key}
                  className={`shrink-0 grow basis-0 ${key === "name" ? "hidden md:block" : ""}`}
                >
                  {title}
                </div>
              ))}
            </div>
            {isLoading ? (
              <div className="py-8 text-center">
                고객 문의 목록을 불러오는 중…
              </div>
            ) : (
              <InquiryList inquiryData={inquiryData} />
            )}
          </div>
        </div>

        <footer className="flex w-full items-center justify-between">
          <div className="text-base font-normal text-[#415ac7]">
            총 요청 {count}건
          </div>
          {/* //TODO: 예약 수정하고 탭 이동 시 에러 발생  */}
          <Pagination
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            groupStart={groupStart}
            groupEnd={groupEnd}
            goToPrevGroup={goToPrevGroup}
            goToNextGroup={goToNextGroup}
            page={page}
            setPage={setPage}
          />
        </footer>
      </div>
    </section>
  );
}

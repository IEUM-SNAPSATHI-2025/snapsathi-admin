import Pagination from "@components/Pagination";
import SearchBar from "@components/SearchBar";
import usePagination from "@hooks/usePagination";
import useSearchFilter from "@hooks/useSearchFilter";
import { useState } from "react";
import InquiryList from "../components/InquiryList";
import { PAGE_LIMIT } from "../constants/reservation";
import useGetInquiries from "../hooks/useGetInquiries";

const titleItems = {
  id: "예약번호",
  // name: "이름",
  message: "문의내용",
  created_at: "작성일(한국 기준)",
};

export default function InquiryContent() {
  const [page, setPage] = useState(1);

  const {
    data: { data: inquiryData = [], count = 0 } = {},
    isLoading,
    isError,
    error,
  } = useGetInquiries({
    page,
    limit: PAGE_LIMIT,
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

  const {
    searchKeyword,
    handleSearchInputChange,
    filteredData: filteredInquiryData,
  } = useSearchFilter(inquiryData);

  if (isError) {
    return (
      <div role="alert">
        문의 목록을 불러오는 데 실패했습니다: {error.message}
      </div>
    );
  }

  return (
    <section className="flex h-fit min-h-[43rem] w-full flex-col justify-between gap-4 rounded-xl bg-white px-8 py-6 text-black">
      <div className="flex flex-col gap-5">
        <header className="text-lg font-medium">고객 문의</header>
        <SearchBar
          inputValue={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <div className="flex flex-col">
          <div className="flex w-full items-center gap-2 text-base font-medium text-gray-400">
            {Object.entries(titleItems).map(([key, title]) => (
              <div key={key} className="shrink-0 grow basis-0">
                {title}
              </div>
            ))}
          </div>
          {isLoading ? (
            <div className="py-8 text-center">
              고객 문의 목록을 불러오는 중…
            </div>
          ) : (
            <InquiryList inquiryData={filteredInquiryData} />
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
    </section>
  );
}

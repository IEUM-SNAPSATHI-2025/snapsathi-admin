import Pagination from "@components/Pagination";
import SearchBar from "@components/SearchBar";
import useDebounce from "@hooks/useDebounce";
import usePagination from "@hooks/usePagination";
import { useEffect, useState } from "react";
import { PAGE_LIMIT } from "../constants/reservation";
import useGetReservations from "../hooks/useGetReservations";
import ReservationList from "./ReservationList";
import ReservationModal from "./ReservationModal";

const titleItems = {
  name: "예약자명",
  event_date: "이벤트 날짜",
  service_hours: "서비스 시간",
  location: "서비스 장소",
  whatsapp: "번호", // TODO: 나중에 whatsapp이 아니라 phone_number로 바꿀 것
  status: "예약 상태",
  created_at: "생성일(한국 기준)",
};

export default function ReservationContent({ selectedTabLabel }) {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedKeyword = useDebounce(searchKeyword, 300);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const {
    data: { data: reservationData = [], count = 0 } = {},
    isLoading,
    isError,
    error,
  } = useGetReservations({
    status: selectedTabLabel,
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
        예약 목록을 불러오는 데 실패했습니다: {error.message}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <SearchBar
        inputValue={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <div
        role="tabpanel"
        id={`tabpanel-${selectedTabLabel}`}
        aria-labelledby={`tab-${selectedTabLabel}`}
        className="flex h-fit min-h-[43rem] w-full flex-col justify-between gap-4 rounded-xl bg-white px-8 py-6 text-black"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2 text-base font-medium text-gray-400">
              {Object.entries(titleItems).map(([key, title]) => (
                <div key={key} className="shrink-0 grow basis-0">
                  {title}
                </div>
              ))}
            </div>
            {isLoading ? (
              <div className="py-8 text-center">예약 목록을 불러오는 중…</div>
            ) : (
              <ReservationList reservationData={reservationData} />
            )}
          </div>
        </div>

        <footer className="flex w-full items-center justify-between">
          <div className="text-base font-normal text-[#415ac7]">
            총 예약 {count}건
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

        <ReservationModal />
      </div>
    </section>
  );
}

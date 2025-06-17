import useModalStore from "@/stores/useModalStore";
import { formatDate, formatDateWithTime } from "@utils/formatDate";

export default function ReservationItem({ reservation }) {
  const { openModal } = useModalStore();

  return (
    <div
      onClick={() => openModal("reservation", reservation)}
      className="flex w-full cursor-pointer flex-col items-center hover:bg-gray-50"
    >
      <div className="flex flex-col items-center gap-3 self-stretch pt-3">
        <div className="flex w-full items-center gap-2 text-sm font-normal text-gray-800">
          {/* 예약자명 */}
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {reservation.name}
          </div>
          {/* 이벤트 날짜 */}
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {reservation.event_date}
          </div>
          {/* 서비스 장소 */}
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {reservation.location}
          </div>
          {/* 번호 - 태블릿&데스크탑 이상에서만 표시 */}
          <div className="hidden shrink-0 grow basis-0 items-center self-stretch md:flex">
            {reservation.whatsapp}
          </div>
          {/* 예약 상태- 확약/미확약 */}
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {reservation.status}
          </div>
          {/* 날짜 - 모바일에서는 날짜만, 태블릿&데스크탑은 시간까지 */}
          <div className="hidden shrink-0 grow basis-0 items-center self-stretch md:flex">
            {formatDateWithTime(reservation.created_at)}
          </div>
          <div className="flex shrink-0 grow basis-0 items-center self-stretch md:hidden">
            {formatDate(reservation.created_at)}
          </div>
        </div>
        <div className="h-[0.0625rem] w-full bg-gray-100"></div>
      </div>
    </div>
  );
}

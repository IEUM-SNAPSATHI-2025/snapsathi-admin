import { formatDate, formatDateWithTime } from "@utils/formatDate";
import { truncateText } from "@utils/truncateText";
import { useNavigate } from "react-router-dom";

export default function InquiryItem({ inquiry }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/reservation-inquiry/${inquiry.id}`)}
      className="flex w-full cursor-pointer flex-col items-center hover:bg-gray-50"
    >
      <div className="flex flex-col items-center gap-3 self-stretch pt-3">
        <div className="flex w-full items-center gap-2 text-sm font-normal text-gray-800">
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {inquiry.reservation_number}
          </div>
          {/* 이름 - 태블릿&데스크탑 이상에서만 표시 */}
          <div className="hidden shrink-0 grow basis-0 items-center self-stretch md:flex">
            {inquiry.name}
          </div>
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {truncateText(inquiry.message)}
          </div>

          {/* 날짜 - 모바일에서는 날짜만, 태블릿&데스크탑은 시간까지 */}
          <div className="hidden shrink-0 grow basis-0 items-center self-stretch md:flex">
            {formatDateWithTime(inquiry.created_at)}
          </div>
          <div className="flex shrink-0 grow basis-0 items-center self-stretch md:hidden">
            {formatDate(inquiry.created_at)}
          </div>
        </div>
        <div className="h-[0.0625rem] w-full bg-gray-100"></div>
      </div>
    </div>
  );
}

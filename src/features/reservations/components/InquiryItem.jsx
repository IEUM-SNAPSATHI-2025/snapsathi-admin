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
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {inquiry.name}
          </div>
          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {truncateText(inquiry.message)}
          </div>

          <div className="flex shrink-0 grow basis-0 items-center self-stretch">
            {/* // TODO: 유틸 함수로 빼기 */}
            {new Date(inquiry.created_at).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <div className="h-[0.0625rem] w-full bg-gray-100"></div>
      </div>
    </div>
  );
}

import Button from "@components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore";
import { DEFAULT_FORM_VALUES } from "../constants/reservation";
import useGetReservationByNumber from "../hooks/useGetReservationByNumber";
import useUpdateInquiryStatus from "../hooks/useUpdateInquiryStatus";
import useUpdateReservation from "../hooks/useUpdateReservation";
import ReservationForm from "./ReservationForm";

export default function InquiryDetailContent({
  inquiry,
  reservationNumber,
  loadingRequest,
  errorRequest,
}) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useUserStore();

  const {
    data: reservation = {},
    isLoading: loadingReservation,
    error: errorReservation,
  } = useGetReservationByNumber(reservationNumber, {
    enabled: !!reservationNumber,
  });
  const [formData, setFormData] = useState(() => DEFAULT_FORM_VALUES);

  const updateMutation = useUpdateReservation({
    closeModal: () => setIsEdit(false),
    setIsEdit,
  });

  const updateInquiryStatus = useUpdateInquiryStatus();
  const handleConfirmInquiryClick = () => {
    if (!inquiry?.id || !inquiry.email || !inquiry.reservation_number) return;
    if (
      confirm("정말 문의를 종료하시겠어요?\n종료된 문의는 다시 열 수 없습니다.")
    ) {
      updateInquiryStatus.mutate({
        id: inquiry.id,
        email: inquiry.email,
        reservationNumber: inquiry.reservation_number,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.email || "unknown",
      });
    }
  };

  useEffect(() => {
    if (reservation && Object.keys(reservation).length > 0) {
      setFormData({ ...DEFAULT_FORM_VALUES, ...reservation });
    }
  }, [reservation]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
  };
  const handleFormSubmit = () => {
    const { id, created_at, ...rest } = formData;
    const newFormData = {
      ...rest,
      modified_at: new Date().toISOString(),
      modified_by: user?.email || "unknown",
    };
    updateMutation.mutate({ id, newFormData });
  };

  if (loadingReservation || loadingRequest) {
    return <div className="p-6">로딩 중입니다...</div>;
  }

  if (errorReservation || errorRequest) {
    return (
      <div className="p-6 text-red-600">
        오류가 발생했습니다.
        <br />
        {errorReservation?.message || errorRequest?.message}
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">문의 내역</h2>
          <small>
            작성일:{" "}
            {new Date(inquiry.created_at).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>

          <div className="border-b border-gray-300 bg-white p-3 text-sm font-normal text-gray-900">
            <p className="w-full overflow-y-auto whitespace-pre-wrap break-all">
              {inquiry.message || "문의 내용이 없습니다."}
            </p>
          </div>
        </div>
        <ReservationForm
          reservation={formData ?? emptyReservation}
          isEdit={isEdit}
          onChange={handleFormChange}
        />
      </div>
      <div className="mt-8 flex gap-3">
        {isEdit ? (
          <>
            <Button onClick={() => setIsEdit(false)} variant="outlined">
              취소
            </Button>
            <Button onClick={handleFormSubmit}>저장</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEdit(true)}>예약 수정하기</Button>
            <Button
              variant="outlined"
              onClick={handleConfirmInquiryClick}
              disabled={updateInquiryStatus.isLoading}
            >
              문의 종료하기
            </Button>
          </>
        )}
      </div>
    </>
  );
}

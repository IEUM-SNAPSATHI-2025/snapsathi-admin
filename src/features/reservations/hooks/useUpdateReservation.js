import updateReservation from "@features/reservations/api/updateReservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendApprovalEmail from "../api/sendApprovalEmail";

export default function useUpdateReservation({ closeModal, setIsEdit }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newFormData }) => updateReservation({ id, newFormData }),
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["reservation", data.id]);

      if (data.status === "confirmed") {
        try {
          await sendApprovalEmail({
            email: data.email,
            reservationNumber: data.reservation_number,
          });

          alert("예약 승인 및 이메일 발송이 성공적으로 처리되었습니다.");
        } catch (error) {
          console.log(error);
          alert("이메일 발송에 실패했습니다.");
        }
      } else {
        alert("예약 정보가 성공적으로 수정되었습니다.");
      }

      setIsEdit(false);
      closeModal();
    },
    onError: (error) => {
      alert("요청이 실패했습니다." + error.message);
    },
  });
}

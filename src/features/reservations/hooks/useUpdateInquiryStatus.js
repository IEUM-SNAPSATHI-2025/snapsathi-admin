import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import sendInquiryCompleteEmail from "../api/sendInquiryCompleteEmail";
import updateInquiryStatus from "../api/updateInquiryStatus";

export default function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      id,
      email,
      reservationNumber,
      reviewed_at,
      reviewed_by,
    }) => {
      try {
        await sendInquiryCompleteEmail({ email, reservationNumber });
      } catch (err) {
        console.error(err);
        throw new Error("이메일 발송에 실패했습니다.");
      }

      // 이메일 성공 시에만 상태를 'completed'로 업데이트
      return await updateInquiryStatus({
        id,
        status: "completed",
        reviewed_at,
        reviewed_by,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["inquiry"]);
      alert("문의가 종료되었습니다.");
      navigate("/inquiry");
    },

    onError: (error) => {
      alert(
        `문의 종료 중 오류가 발생했습니다. 다시 시도해주세요.\n\n에러 메시지: ${error.message}`,
      );
    },
  });
}

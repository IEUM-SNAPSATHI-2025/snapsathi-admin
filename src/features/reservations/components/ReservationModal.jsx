import Backdrop from "@components/Backdrop";
import Button from "@components/Button";
import ModalPortal from "@components/ModalPortal";
import MoreActionsDropdown from "@components/MoreActionsDropdown";
import useDeleteReservation from "@features/reservations/hooks/useDeleteReservation";
import useUpdateReservation from "@features/reservations/hooks/useUpdateReservation";
import useModalStore from "@stores/useModalStore";
import useUserStore from "@stores/useUserStore";
import { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";

export default function ReservationModal() {
  const { isOpen, data: reservation, type, closeModal } = useModalStore();
  const { user } = useUserStore();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const closeButtonText = isEdit ? "취소" : "닫기";

  useEffect(() => {
    if (reservation) {
      setFormData(reservation);
    }
  }, [reservation]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMutation = useUpdateReservation({ closeModal, setIsEdit });

  const handleFormSubmit = () => {
    const { id, created_at, ...rest } = formData;
    const newFormData = {
      ...rest,
      modified_at: new Date().toISOString(),
      modified_by: user?.email || "unknown",
    };
    updateMutation.mutate({ id, newFormData });
  };

  const deleteMutation = useDeleteReservation({
    closeModal,
  });

  const handleReservationDelete = () => {
    if (confirm("정말 삭제하시겠어요? 삭제된 예약은 복구할 수 없습니다.")) {
      deleteMutation.mutate(reservation.id);
    }
  };

  if (!isOpen || !reservation || type !== "reservation") return null;

  return (
    <ModalPortal>
      <Backdrop />
      <div className="fixed inset-0 z-50 flex items-start justify-start lg:items-center lg:justify-center">
        <div className="flex max-h-screen w-full flex-col items-start overflow-y-auto rounded-lg bg-white p-8 lg:max-h-[80vh] lg:w-[50vw]">
          <div className="flex w-full flex-col items-start gap-6">
            <main className="flex w-full flex-col gap-6">
              <header className="flex flex-row items-center justify-between text-xl font-medium text-black">
                <span>예약 정보</span>
                <MoreActionsDropdown
                  onEdit={() => setIsEdit(true)}
                  onDelete={handleReservationDelete}
                />
              </header>

              <ReservationForm
                reservation={formData}
                isEdit={isEdit}
                onChange={handleFormChange}
              />
            </main>

            <footer className="flex flex-row gap-2">
              <Button
                onClick={closeModal}
                ariaLabel={closeButtonText}
                variant="outlined"
              >
                {closeButtonText}
              </Button>
              {isEdit && (
                <Button ariaLabel="저장" onClick={handleFormSubmit}>
                  저장
                </Button>
              )}
            </footer>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

import useRedirectIfUnauthenticated from "@hooks/useRedirectIfUnauthenticated";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InquiryDetailContent from "../components/InquiryDetailContent";
import useGetInquiryById from "../hooks/useGetInquiryById";

export default function ReservationInquiryDetailPage() {
  const { isAuthenticated } = useRedirectIfUnauthenticated();
  const [reservationNumber, setReservationNumber] = useState(null);

  const { id } = useParams();

  const {
    data: inquiry,
    isLoading: loadingRequest,
    error: errorRequest,
  } = useGetInquiryById(id, { enabled: isAuthenticated });

  useEffect(() => {
    if (inquiry?.reservation_number) {
      setReservationNumber(inquiry.reservation_number);
    }
  }, [inquiry?.reservation_number]);

  if (!isAuthenticated) return null;

  return (
    <main className="flex flex-col gap-5 px-5 py-5 md:px-10">
      {inquiry && (
        <>
          <h1 className="mb-4 text-2xl font-bold">
            {inquiry?.name ?? ""}님의 문의
          </h1>
          <InquiryDetailContent
            id={id}
            inquiry={inquiry}
            reservationNumber={reservationNumber}
            loadingRequest={loadingRequest}
            errorRequest={errorRequest}
          />
        </>
      )}
    </main>
  );
}

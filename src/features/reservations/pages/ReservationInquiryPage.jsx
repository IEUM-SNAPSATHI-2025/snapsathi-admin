import useRedirectIfUnauthenticated from "@hooks/useRedirectIfUnauthenticated";
import InquiryContent from "../components/InquiryContent";

export default function ReservationInquiryPage() {
  const { isAuthenticated } = useRedirectIfUnauthenticated();

  if (!isAuthenticated) return null;

  return (
    <main className="flex flex-col gap-5 px-5 py-5 md:px-10">
      <h1 className="text-[2rem] font-semibold text-black">고객 문의 관리</h1>

      <InquiryContent />
    </main>
  );
}

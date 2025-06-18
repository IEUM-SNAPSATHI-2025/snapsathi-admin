import TabMenu from "@components/Tab/TabMenu";
import useRedirectIfUnauthenticated from "@hooks/useRedirectIfUnauthenticated";
import { useState } from "react";
import ReservationContent from "../components/ReservationContent";
import { TABS } from "../constants/reservation";

export default function ReservationPage() {
  const { isAuthenticated } = useRedirectIfUnauthenticated();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isAuthenticated) return null;

  return (
    <main className="flex flex-col gap-5 px-5 py-5 md:px-10">
      <h1 className="text-[2rem] font-semibold text-black">예약 목록 관리</h1>
      <TabMenu
        tabs={TABS}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <ReservationContent selectedTabLabel={TABS[selectedIndex].label} />
    </main>
  );
}

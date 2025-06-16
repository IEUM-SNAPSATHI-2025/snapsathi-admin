import { useState } from "react";
import TabMenu from "../../../components/Tab/TabMenu";
import useRedirectIfUnauthenticated from "../../../hooks/useRedirectIfUnauthenticated";
import ReservationContent from "../components/ReservationContent";
import { TABS } from "../constants/reservation";

export default function ReservationPage() {
  useRedirectIfUnauthenticated();

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <main className="flex flex-col gap-5 px-10 py-5">
      <h1 className="text-[2rem] font-semibold text-black">예약 목록 관리</h1>
      <TabMenu
        tabs={TABS}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <ReservationContent
        selectedTabTitle={TABS[selectedIndex].title}
        selectedTabLabel={TABS[selectedIndex].label}
      />
    </main>
  );
}

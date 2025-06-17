import { useQuery } from "@tanstack/react-query";
import getReservations from "../api/getReservations";

/**
 * @param {"confirmed" | "unconfirmed" | undefined} selectedTabLabel
 */
export default function useGetReservations({
  status,
  page = 1,
  limit,
  keyword,
  // onError,
}) {
  return useQuery({
    queryKey: ["reservations", status, page, keyword],
    queryFn: () => getReservations({ status, page, limit, keyword }),
    keepPreviousData: true,
    staleTime: 1000 * 30,
    // onError,
  });
}

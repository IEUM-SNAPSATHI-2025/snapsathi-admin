import { useQuery } from "@tanstack/react-query";
import getInquiries from "../api/getInquiries";

export default function useGetInquiries({ page = 1, limit, keyword }) {
  return useQuery({
    queryKey: ["inquiries", page, keyword],
    queryFn: () => getInquiries({ page, limit, keyword }),
    keepPreviousData: true,
    staleTime: 1000 * 30,
  });
}

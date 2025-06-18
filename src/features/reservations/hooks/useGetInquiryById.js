import { useQuery } from "@tanstack/react-query";
import getInquiryById from "../api/getInquiryById";

export default function useGetInquiryById(inquiryId, options = {}) {
  return useQuery({
    queryKey: ["inquiry", inquiryId],
    queryFn: () => getInquiryById(inquiryId),
    enabled: !!inquiryId && options.enabled !== false,
    staleTime: 1000 * 30,
  });
}

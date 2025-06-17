import supabase from "@/supabase";

export default async function getInquiries({ page = 1, limit = 6, keyword }) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("reservation_inquiries")
    .select("*", { count: "exact" })
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (keyword && keyword.trim() !== "") {
    const search = `%${keyword.trim()}%`;
    query = query.or(
      `name.ilike.${search},reservation_number.ilike.${search},message.ilike.${search}`,
    );
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return { data, count };
}

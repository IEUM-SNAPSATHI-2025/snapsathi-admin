import supabase from "@/supabase";

export default async function getReservations({
  status,
  page = 1,
  limit = 6,
  keyword,
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // status 필터
  if (status === "confirmed") {
    query = query.eq("status", "confirmed");
  } else if (status === "unconfirmed") {
    query = query.eq("status", "unconfirmed");
  } else {
    query = query.or("status.eq.confirmed,status.eq.unconfirmed");
  }

  // keyword 필터
  if (keyword && keyword.trim() !== "") {
    const search = `%${keyword.trim()}%`;

    query = query.or(
      `name.ilike.${search},email.ilike.${search},whatsapp.ilike.${search},reservation_number.ilike.${search}`,
    );
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return { data, count };
}

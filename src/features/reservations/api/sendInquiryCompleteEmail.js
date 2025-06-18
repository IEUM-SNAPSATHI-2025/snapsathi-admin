const FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default async function sendInquiryCompleteEmail({
  email,
  reservationNumber,
}) {
  const res = await fetch(`${FUNCTION_URL}/send-inquiry-complete-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify({ email, reservationNumber }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`이메일 전송 실패: ${errorBody}`);
  }

  return res.json();
}

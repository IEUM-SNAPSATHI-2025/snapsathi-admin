import supabase from "@/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirectIfAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/", { replace: true });
      }
    }

    checkAuth();
  }, [navigate]);
}

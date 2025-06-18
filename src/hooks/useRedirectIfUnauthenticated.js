import supabase from "@/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirectIfUnauthenticated() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/signin", { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, [navigate]);

  return { isAuthenticated };
}

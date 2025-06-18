import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore";
import { signIn } from "../api/auth";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      alert("로그인 실패: " + error.message);
    },
  });
};

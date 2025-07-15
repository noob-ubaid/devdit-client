import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "./useRole";

const useDashboardHomeRedirect = () => {
  const [role, isPending] = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (isPending) return;

    if (role === "admin") {
      navigate("/dashboard/adminProfile", { replace: true });
    } else {
      navigate("/dashboard/myProfile", { replace: true });
    }
  }, [role,isPending,navigate]);

  return null;
};

export default useDashboardHomeRedirect;

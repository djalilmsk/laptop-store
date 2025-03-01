import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NonAuthenticatedUser({ children }) {
  const { user } = useSelector((state) => state.userReducer) || { user: null };
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user]);
  return <>{children}</>;
}

export function AuthenticatedUser({ children }) {
  const { user } = useSelector((state) => state.userReducer) || { user: null };
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true });
    }
  }, [user]);
  return <>{children}</>;
}

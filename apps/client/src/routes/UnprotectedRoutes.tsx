import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import TokenService from "~/services/TokenService";

const UnprotectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenService.getAccessToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
};

export default UnprotectedRoutes;

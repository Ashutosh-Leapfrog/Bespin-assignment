import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "~/components/NavBar";
import { verifyUser } from "~/services/auth";
import ProfileService from "~/services/ProfileService";
import TokenService from "~/services/TokenService";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: verifyUser,
  });

  ProfileService.setProfile(data);

  useEffect(() => {
    if (!TokenService.getAccessToken()) {
      navigate("/login", { replace: true });
    }
  }, [data]);

  return (
    <Container maxWidth="xl" className="w-full h-screen">
      <NavBar />
      <div className="w-full h-screen p-9">
        <Outlet />
      </div>
    </Container>
  );
};

export default ProtectedRoutes;

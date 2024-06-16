import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "~/components/NavBar";
import TokenService from "~/services/TokenService";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!TokenService.getAccessToken()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Container maxWidth="xl">
      <NavBar />
      <Box sx={{ marginTop: 2, paddingLeft: 3 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default ProtectedRoutes;

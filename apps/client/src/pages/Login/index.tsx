import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { ILogin, ILoginResponse } from "~/interfaces/ILogin";
import { login } from "~/services/auth";
import TokenService from "~/services/TokenService";
import showServerError from "~/utils/showServerError";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Invalid email")
    .required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: login,
  });

  const handleSubmit = async (values: ILogin) => {
    try {
      const data: ILoginResponse = await loginMutation(values);

      await TokenService.setTokens(data.accessToken, data.refreshToken);

      navigate("/", { replace: true });
    } catch (error) {
      showServerError(error);
    }
  };

  const formik = useFormik<ILogin>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", paddingTop: 10 }}>
      <h1 className="text-3xl font-bold text-primary-900 mb-4">Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            label="Email"
            name="username"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </form>
      <Box display={"flex"} gap={1} mt={2} sx={{ justifyContent: "center" }}>
        <Typography>Don't have an account?</Typography>
        <Link
          className="text-secondary-900 hover:text-primary-900"
          to={"/register"}
        >
          Register
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;

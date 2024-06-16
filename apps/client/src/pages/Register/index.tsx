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
import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Dropzone from "~/components/Dropzone";

import { ICreateUser } from "~/interfaces/IUser";
import { register } from "~/services/auth";
import { uploadFile } from "~/services/files";
import showServerError from "~/utils/showServerError";
import { successToast } from "~/utils/toast";

const createUserSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  bio: yup.string().max(250, "Bio must not exceed 250 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: registerMutation, isPending } = useMutation({
    mutationFn: register,
  });

  const { mutateAsync: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: uploadFile,
  });

  const handleSubmit = async (values: ICreateUser) => {
    try {
      const uploadResponse = await uploadImage(
        values.imageUrl as unknown as File
      );

      if (!isUploading) {
        await registerMutation({
          ...values,
          imageUrl: uploadResponse.data.fileUrl,
        });

        successToast("User created successfully");

        navigate("/login", { replace: true });
      }
    } catch (error) {
      showServerError(error);
    }
  };

  const formik = useFormik<ICreateUser>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      imageUrl: "",
      bio: "",
    },

    onSubmit: handleSubmit,

    validationSchema: createUserSchema,
  });

  return (
    <Container maxWidth="sm" className="my-10">
      <h1 className="text-3xl font-bold mb-4 text-primary-900 text-center">
        Register User
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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

          <TextField
            label="Bio"
            name="bio"
            variant="outlined"
            fullWidth
            multiline
            minRows={5}
            onChange={formik.handleChange}
            value={formik.values.bio}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />

          <Dropzone
            name="imageUrl"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue(
                "imageUrl",
                event.currentTarget.files?.[0] ?? ""
              );
            }}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <Typography color="error">{formik.errors.imageUrl}</Typography>
          )}

          <Button
            variant="contained"
            size="large"
            disabled={isPending}
            type="submit"
            TouchRippleProps={{ center: true }}
          >
            {isPending ? <CircularProgress /> : "Register"}
          </Button>
        </Box>
      </form>
      <div className="mt-4 text-center flex justify-center items-center gap-2">
        <Typography>Already have an account?</Typography>{" "}
        <Link
          className="text-secondary-900 decoration-none hover:text-primary-900"
          to="/login"
          replace
        >
          Login
        </Link>
      </div>
    </Container>
  );
};

export default RegisterPage;

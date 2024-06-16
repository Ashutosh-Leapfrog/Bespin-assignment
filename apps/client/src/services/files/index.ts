import http from "../http";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await http.post(
    "/files/upload",
    {
      file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

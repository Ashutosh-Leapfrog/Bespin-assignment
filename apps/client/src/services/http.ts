import axios from "axios";
import TokenService from "./TokenService";
import config from "~/config";

const http = axios.create({
  baseURL: config.API_BASE_URL,
});

const excludeRoutes = ["/register", "/login", "/refresh"];

http.interceptors.request.use((config) => {
  if (excludeRoutes.includes(config.url as string)) {
    return config;
  }

  const token = TokenService.getAccessToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

export default http;

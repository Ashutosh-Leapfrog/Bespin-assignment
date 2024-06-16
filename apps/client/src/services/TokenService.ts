const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export default class TokenService {
  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  static getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  static setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  static removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  static setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  static setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }
}

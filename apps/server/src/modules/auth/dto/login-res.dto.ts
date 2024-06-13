export class LoginResDto {
  private token: {
    accessToken: string;
    refreshToken: string;
  };
  private message: string;

  constructor(
    message: string,
    token: { accessToken: string; refreshToken: string },
  ) {
    this.token = token;
    this.message = message;
  }

  getToken() {
    return this.token;
  }

  setToken(token: { accessToken: string; refreshToken: string }) {
    this.token = token;
  }

  getMessage() {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }
}

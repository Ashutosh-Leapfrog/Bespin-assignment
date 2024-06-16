import { AxiosResponse } from "axios";

export interface ServerError extends AxiosResponse {
  response: {
    data: {
      message: string;
    };
  };
}

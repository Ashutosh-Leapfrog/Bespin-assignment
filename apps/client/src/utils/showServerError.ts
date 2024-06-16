import { ServerError } from "~/interfaces/IError";
import { errorToast } from "./toast";

export default (error: unknown) => {
  console.error(error);
  errorToast((error as ServerError).response.data.message);
};

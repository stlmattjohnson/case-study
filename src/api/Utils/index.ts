import { AxiosError, AxiosResponse } from "axios";
import ProblemDetails from "../../models/ProblemDetails";

export class ApiError extends Error {
  constructor(public response?: ProblemDetails, message?: string) {
    super(message);
  }
}

export function deAxios<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  return promise
    .then((res) => res.data)
    .catch((err: AxiosError<ProblemDetails>) => {
      throw new ApiError(err.response?.data);
    });
}

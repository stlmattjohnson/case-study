import { AxiosResponse, AxiosResponseHeaders, AxiosRequestConfig } from "axios";

export const createAxiosResponse = (data: any): AxiosResponse => {
  const headers: AxiosResponseHeaders = {};
  const config: AxiosRequestConfig = {};

  const responseData: AxiosResponse = {
    config: config,
    status: 200,
    statusText: "OK",
    headers: headers,
    data: data,
  };

  return responseData;
};

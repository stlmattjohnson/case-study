import React from "react";
import { AxiosResponse, AxiosResponseHeaders, AxiosRequestConfig } from "axios";

export const createAxiosResponse = <T>(data: T): AxiosResponse => {
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

export type WrapperProps = {
  children: React.ReactNode;
};

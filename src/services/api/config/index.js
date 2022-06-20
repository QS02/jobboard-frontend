import axios from "axios";
import axiosRetry from "axios-retry";
import { create } from "apisauce";
import * as interceptors from "@api/config/interceptors";

/**
 * Web api confgiration
 */
export const webApi = ({ auth, req, res, asset } = {}) => {
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const baseApi = axios.create({
    baseURL: asset ? "" : process.env.apiBaseUrl,
    responseType: asset ? "blob" : false,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      ...(auth && accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
    },
  });

  baseApi.interceptors.request.use(
    (config) => {
      config = interceptors.uploadRequest(baseApi, config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosRetry(baseApi, { retryDelay: axiosRetry.exponentialDelay });
  return create({
    axiosInstance: baseApi,
    timeout: 20000,
  });
};

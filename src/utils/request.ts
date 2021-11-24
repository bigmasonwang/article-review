import axios, { AxiosRequestConfig } from "axios";
import { DEVELOPMENT_API_URL, PRODUCTION_API_URL, UAT_API_URL } from "../constants/apiUrl";

const getApiUrl = () => {
  const environment = process.env.NODE_ENV;

  switch (environment) {
    case 'production':
      return PRODUCTION_API_URL;
    case 'uat':
      return UAT_API_URL;
    default:
      return DEVELOPMENT_API_URL;
  }
};

const baseURL = `${getApiUrl()}/api/`;
const timeout = 30000;

export default function request(options: AxiosRequestConfig) {
  const axiosInstance = axios.create({
    baseURL,
    timeout,
  });

  return axiosInstance(options);
}
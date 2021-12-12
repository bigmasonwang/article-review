import axios, { AxiosRequestConfig } from 'axios';
import { DEVELOPMENT_API_URL, PRODUCTION_API_URL } from '../constants/apiUrl';
import { get as storageGet } from './localStorage';

const getApiUrl = () => {
  const environment = process.env.NODE_ENV;

  switch (environment) {
    case 'production':
      return PRODUCTION_API_URL;
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
    headers: {
      'Authorization': JSON.parse(storageGet('token')),
    },
  });

  return axiosInstance(options);
}

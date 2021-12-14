import { AxiosRequestConfig } from 'axios';
import request from '../utils/request';

export const loginService = async (params: {
  email: string;
  password: string;
}) => {
  const config: AxiosRequestConfig = {
    url: 'users/login',
    method: 'POST',
    data: params,
  };
  return request(config);
};

export const signupService = async (params: {
  userName: string;
  email: string;
  password: string;
}) => {
  const config: AxiosRequestConfig = {
    url: 'users/signup',
    method: 'POST',
    data: params,
  };
  return request(config);
};

export const getReceivedArticles = async () => {
  const config: AxiosRequestConfig = {
    url: 'users/articles',
    method: 'GET',
  };
  return request(config);
};

export const sendArticlesToUser = async (params: {
  sendToUserId: string;
  articleIds: string[];
}) => {
  const config: AxiosRequestConfig = {
    url: 'users/articles',
    method: 'POST',
    data: params,
  };
  return request(config);
};

export const getAllUsers = async () => {
  const config: AxiosRequestConfig = {
    url: 'users',
    method: 'GET',
  };
  return request(config);
};

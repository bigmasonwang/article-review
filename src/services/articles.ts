import { AxiosRequestConfig } from 'axios';
import IArticlesQuery from '../types/IArticlesQuery';
import request from '../utils/request';

export const getArticles = async (query: IArticlesQuery) => {
  const config: AxiosRequestConfig = {
    url: `articles?page=${query.page}&source=${query.source}&dateFrom=${query.dateFrom}&dateTo=${query.dateTo}&keyword=${query.keyword}`,
    method: 'GET',
  };

  return request(config);
};

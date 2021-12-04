import { AxiosRequestConfig } from 'axios';
import IArticlesQuery from '../types/IArticlesQuery';
import request from '../utils/request';

export const getArticles = async (query: IArticlesQuery) => {
  const sourcesQuery = query.sources.map(source => `&source=${source}`).join();
  
  const config: AxiosRequestConfig = {
    url: `articles?page=${query.page}${sourcesQuery}&dateFrom=${query.dateFrom}&dateTo=${query.dateTo}&keyword=${query.keyword}`,
    method: 'GET',
  };

  return request(config);
};

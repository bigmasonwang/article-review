import { AxiosRequestConfig } from 'axios';
import IArticleComment from '../types/IArticleComment';
import IArticleEditInfo from '../types/IArticleEditInfo';
import IArticlesQuery from '../types/IArticlesQuery';
import request from '../utils/request';

export const getArticles = async (query: IArticlesQuery) => {
  const sourcesQuery = query.sources
    .map((source) => `&source=${source}`)
    .join('');

  const config: AxiosRequestConfig = {
    url: `articles?page=${query.page}${sourcesQuery}&dateFrom=${query.dateFrom}&dateTo=${query.dateTo}&keyword=${query.keyword}`,
    method: 'GET',
  };

  return request(config);
};

export const postArticleTranslation = async (info: IArticleEditInfo) => {
  const config: AxiosRequestConfig = {
    url: `articles/${info._id}/translation`,
    method: 'POST',
    data: { title_en: info.title_en, content_en: info.content_en },
  };

  return request(config);
};

export const postComment = async (comment: IArticleComment) => {
  const config: AxiosRequestConfig = {
    url: `articles/${comment.articleId}/comments`,
    method: 'POST',
    data: { text: comment.text },
  };

  return request(config);
}

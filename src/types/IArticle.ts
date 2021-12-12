import IArticleComment from "./IArticleComment";

export default interface IArticle {
  _id: string;
  date: number;
  url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  source: string;
  comments: IArticleComment[];
}

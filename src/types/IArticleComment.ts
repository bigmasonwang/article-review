export default interface IArticleComment {
  articleId: string;
  _id?: string;
  commenterName?: string;
  commenterId?: string;
  date?: string;
  text: string;
}

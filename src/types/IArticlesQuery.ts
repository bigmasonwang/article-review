export default interface IArticlesQuery {
  dateFrom: string;
  dateTo: string;
  sources: string[];
  keyword: string;
  page: number;
}

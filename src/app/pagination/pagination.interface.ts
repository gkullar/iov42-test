export interface Pagination<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

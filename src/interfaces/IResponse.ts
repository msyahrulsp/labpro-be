export interface IResponse<T=void> {
  message: string;
  data?: T;
}
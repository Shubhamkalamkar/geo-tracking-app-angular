export interface IApiSuccessResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

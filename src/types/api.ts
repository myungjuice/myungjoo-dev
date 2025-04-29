export type ApiSuccessResponse<T> = {
  success: true;
  statusCode: number;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  data: {
    message: string;
    path: string;
    timestamp: string;
  };
};

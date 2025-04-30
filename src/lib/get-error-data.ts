export const getErrorData = (message: string, statusCode: number, path: string) => ({
  success: false,
  statusCode,
  data: {
    message,
    path,
    timestamp: new Date().toISOString(),
  },
});

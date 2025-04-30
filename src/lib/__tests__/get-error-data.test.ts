import { getErrorData } from '../get-error-data';

describe('getErrorData', () => {
  it('올바른 에러 데이터를 반환해야 합니다', () => {
    const message = '에러 메시지';
    const statusCode = 404;
    const path = '/some/path';

    const result = getErrorData(message, statusCode, path);

    expect(result).toEqual({
      success: false,
      statusCode,
      data: {
        message,
        path,
        timestamp: expect.any(String),
      },
    });
  });

  it('다른 에러 메시지와 상태 코드를 처리해야 합니다', () => {
    const message = '다른 에러 메시지';
    const statusCode = 500;
    const path = '/another/path';

    const result = getErrorData(message, statusCode, path);

    expect(result).toEqual({
      success: false,
      statusCode,
      data: {
        message,
        path,
        timestamp: expect.any(String),
      },
    });
  });
});

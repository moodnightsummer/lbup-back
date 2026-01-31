import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = '서버 오류가 발생했습니다.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object') {
        const r = res as any;
        code = r.code ?? code;
        message = r.message ?? message;
      } else {
        message = res;
      }
    }

    response.status(status).json({
      success: false,
      code,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

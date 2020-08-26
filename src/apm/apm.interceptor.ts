import {
  Injectable,
  CallHandler,
  HttpException,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ApmService } from './apm.service';

@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly apmService: ApmService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response> {
    const {
      raw: { url, method },
    } = ctx.switchToHttp().getRequest();
    const transaction = this.apmService.startTransaction(
      `${method} ${String(url).split('?')[0].toLowerCase()}`,
      'request',
    );

    return next.handle().pipe(
      tap(() => {
        transaction.end('HTTP 2xx');
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          if (err.getStatus() === 500) {
            this.apmService.captureError(err.message);
          }

          transaction.end(`HTTP ${String(err.getStatus())[0]}xx`);
        } else {
          this.apmService.captureError(err);
        }

        throw err;
      }),
    );
  }
}

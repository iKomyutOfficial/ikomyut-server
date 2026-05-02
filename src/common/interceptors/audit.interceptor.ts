import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestWithCompany } from '../../types/request';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AUDIT');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<RequestWithCompany>();
    const user = req.user;
    const method = req.method;
    const url = req.url;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        this.logger.log(
          `${method} ${url} | username:${user?.username ?? 'guest'} | role:${user?.role ?? 'guest'} | company:${user?.companyId ?? 'unknown'} | ${ms}ms`,
        );
      }),
    );
  }
}

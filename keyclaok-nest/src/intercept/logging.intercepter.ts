import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('filter interceptor');
    //Adding the object to the request body
    request.body.config = {};
    // Log request information
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Body:', request.body);
    console.log('Request Query:', request.query);
    return next.handle();
  }
}
@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    //Adding the object to the request body
    console.log('pagination interceptor');
    // request.body.config = {};
    // // Log request information
    // console.log('Request URL:', request.url);
    // console.log('Request Method:', request.method);
    // console.log('Request Body:', request.body);
    // console.log('Request Query:', request.query);
    return next.handle();
  }
}

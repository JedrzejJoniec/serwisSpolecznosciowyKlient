import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  constructor(private loadingService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem("token");
    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {Authorization: `${token}`}
      });
    }
    if (request.url.includes('/chat?') || (request.url.includes('/file') && request.url.includes('/user') && request.url.includes('/' + sessionStorage.getItem("id"))) ||request.url.includes('/users') || (request.url.includes('/reactions'))) {
      return next.handle(request);
    }
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}





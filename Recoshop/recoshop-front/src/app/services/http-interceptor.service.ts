import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService {
    constructor() {}

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //   const token: string = localStorage.getItem('rs-token');

    //   let request = req;

    //   if (token) {
    //     request = req.clone({
    //       headers: req.headers.set('Authorization', 'Bearer ' + token)
    //     });
    //   }

    //   return next.handle(request);
    // }
}

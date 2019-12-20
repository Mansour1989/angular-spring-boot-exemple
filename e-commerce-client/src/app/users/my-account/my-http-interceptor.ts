import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from "rxjs/operators";


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            headers: req.headers.set('headerName', 'headerValue')
        })
        console.log('Sending request with new header now ...');
        return next.handle(authReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success)
                        //comment and add console log    
                        console.log(evt.body.success.message, evt.body.success.title);
                }
            }),
            catchError((err: any) => {
                //intercept the respons error and displace it to the console
                if (err instanceof HttpErrorResponse) {
                    console.log('Error Occurred : ',err);
                }
                //return the error to the method that called it
                return of(err);
            }));

    }
}
import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take,  throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor { 
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _authService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        if (this._authService.getJwtToken()) {
            request = this.addToken(request, this._authService.getJwtToken());
        }
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string){
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler){
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
    
            return this._authService.refresh().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;

                this.refreshTokenSubject.next(token.accessToken);
                return next.handle(this.addToken(request, token.accessToken));
                }),
            // catchError((error) => {
            //     debugger;
            //     console.log(error.error);
            // })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    return next.handle(this.addToken(request, jwt))
                })
            )
        }

    }
    
}
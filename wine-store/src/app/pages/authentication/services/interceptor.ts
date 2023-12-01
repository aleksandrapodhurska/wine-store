import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CustomInterceptor implements HttpInterceptor { 
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        const copiedReq = request.clone({
            withCredentials: true
        });
    
        return next.handle(copiedReq);
    }
}

export const customInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true,
}

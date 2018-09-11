import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class AuthService implements HttpInterceptor {
  constructor() {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const authReq = req.clone({
    //  headers: req.headers.set('Authorization', 'Basic ' + btoa('karaf:karaf'))
    //    //.set('Access-Control-Allow-Origin', '*')
    //   // .set('Content-Type', 'application/json')
    //});

    ////const cloneReq = req.clone({ headers: headers });
    ////authReq.headers.set('Access-Control-Allow-Origin', '*')
    //return next.handle(authReq);
    req = req.clone({
      setHeaders: {
        'Accept': `application/json`,
        'Authorization': `Basic b25vczpyb2Nrcw==`,
        'Access-Control-Allow-Origin': `*`
      },
    });
    if (req.method == "OPTIONS") {
      return
    }
    return next.handle(req);
  }
}

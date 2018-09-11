import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hosts } from '../DevicesList/hosts.model';

@Injectable()

export class RegistrationService extends BaseService {
  constructor(public http: HttpClient) {
    super(http);
  }

  GetHosts(): Observable<Array<Hosts>> {
    return this.http.get<Array<Hosts>>('http://192.168.56.102:8181/onos/v1/hosts').map(res => res['hosts']).pipe(
      catchError(this.handleError) //then handle the error
    );
  };

  AddHostDeviceData(data: any, fileName: string): void {
    let params = new HttpParams().set('fileName', fileName);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
    const req = this.http.post('http://localhost:3000/add', data, { headers: headers, params: params })  
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      });
  }
  AddHostDevice(data: any): void {
    const req = this.http.post('http://192.168.56.102:8181/onos/v1/hosts', data)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
      );
  }
}

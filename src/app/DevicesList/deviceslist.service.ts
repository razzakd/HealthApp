import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Devices } from './devices.model';
import { Hosts } from './hosts.model';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class DevicesService extends BaseService {
  constructor(public http: HttpClient) {
    super(http);
  }

  GetDeviceList(): Observable<Array<Devices>> {
    return this.http.get<Array<Devices>>('http://192.168.56.102:8181/onos/v1/devices').map(res => res['devices']).pipe(
      catchError(this.handleError) // then handle the error
    );
  };
  GetHostList(): Observable<Array<Hosts>> {
    return this.http.get<Array<Hosts>>('http://192.168.56.102:8181/onos/v1/hosts').map(res => res['hosts']).pipe(
      catchError(this.handleError) // then handle the error
    );
  };
}



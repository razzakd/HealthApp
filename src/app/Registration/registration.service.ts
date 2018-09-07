import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  private hosts = [];
  GetHosts(): number {
    this.http.get('http://192.168.56.102:8181/onos/v1/hosts').map(res => res['hosts']).subscribe((data) => {
      this.hosts.push(data)
    });
    return this.hosts.length;
  };
  AddHostDeviceData(data:any): void {
    const req = this.http.post('http://localhost:3000/add',data)  
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
      );
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

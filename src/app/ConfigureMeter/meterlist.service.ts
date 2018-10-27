import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Devices } from '../DevicesList/devices.model';
import { Meters } from './meters.model';
import { map } from 'rxjs/operators/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class MeterService extends BaseService {
  constructor(public http: HttpClient) {
      super(http);
      this.dataStore = { meters: [] };
      this._meters = <BehaviorSubject<Meters[]>>new BehaviorSubject([]);
      this.meters = this._meters.asObservable();
    }

  meters: Observable<any>;
  private _meters: BehaviorSubject<any>;
  private dataStore: {
    meters: any
  };

  GetDeviceList(): Observable<Array<Devices>> {
    return this.http.get<Array<Devices>>(this.onos_url + 'devices').map(res => res['devices']).pipe(
      catchError(this.handleError) // then handle the error
    );
  };

  GetMeterList() {
    this.http.get<Meters[]>(this.onos_url + 'meters').subscribe(data => {
        this.dataStore.meters = data['meters'];
        this.dataStore.meters.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      this._meters.next(Object.assign({}, this.dataStore).meters);
    }, error => console.log("error getting Meters"));  
  };


  AddMeter(data: any, selectedDevice: string): void {
    this.http.post(this.onos_url + 'meters/' + selectedDevice, data)
      .subscribe(rData => {
        this.GetMeterList();
        this._meters.next(Object.assign({}, this.dataStore).meters);
        }, err => { console.log("Error occured");
      });
  }

  RemoveMeter(data: any): void {
      let mId = data.id;
      let deviceId = data.deviceId;
      const req = this.http.delete(this.onos_url + 'meters/' + deviceId + '/' + mId)
          .subscribe(
          res => {
            this.dataStore.meters.forEach((t, i) => {
                if (t.id == mId) { this.dataStore.meters.splice(i, 1); }
            });
            this._meters.next(Object.assign({}, this.dataStore).meters);
            console.log(res);
          },
          err => {
              console.log("Error occured");
          });
  }

  RemoveFlowsWithMeter(): void {
      let appId = "org.onosproject.fwd";
      const req = this.http.delete(this.onos_url + 'flows/application/' + appId)
          .subscribe(
          res => {
              console.log(res);
          },
          err => {
              console.log("Error occured");
          });
  }
}



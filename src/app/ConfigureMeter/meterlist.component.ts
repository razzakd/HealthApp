import { Component, OnInit, OnChanges } from '@angular/core'; // importing the OnInit interface
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MeterService } from './meterlist.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Devices } from '../DevicesList/devices.model';
import { Meters } from './meters.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './meter.component.html',
  styleUrls: ['../app.component.css'],
  providers: [MeterService]
})

export class MeterComponent implements OnInit {
  title = 'Quality of Service Setup';
  deviceList: Devices[];
  meterList: Meters[];
  bRate = '';
  meterData = {};
  addMessage = '';
  removeFlowMessage = '';
  meters = '';
  todos: Observable<Meters[]>;
  selectedDevice = '';
  constructor(public meterService: MeterService) { }
  ngOnInit(): void {
      this.meterService.GetDeviceList().subscribe((data) =>
      {
          this.deviceList = data;
          console.log(this.deviceList);
          this.deviceList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    });
    this.todos = this.meterService.meters;
    this.meterService.GetMeterList();
  }

  addMeter(): void {
    this.meterData =
      {
      "deviceId": this.meters,
        "unit": "KB_PER_SEC",
          "burst": false,
            "bands": [
              {
                "type": "DROP",
                "rate": this.bRate,
                "burstSize": "0",
                "prec": "0"
              }
            ]
      };
    this.meterService.AddMeter(this.meterData, this.meters);
    this.addMessage = 'Meter Added';
  }
  removeMeter(meter: Meters): void {
    this.meterService.RemoveMeter(meter);
      console.log(meter);
      this.addMessage = 'Meter Removed';
  }

  removeFlowsWithMeter(): void {
      this.meterService.RemoveFlowsWithMeter();
      this.removeFlowMessage = "Flows associated with Meters are removed"
  }
}

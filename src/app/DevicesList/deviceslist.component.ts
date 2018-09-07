import { Component, OnInit } from '@angular/core'; // importing the OnInit interface

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Devices } from './devices.model';
import { Hosts } from './hosts.model';
import { DevicesService } from './deviceslist.service';

@Component({
  selector: 'app-root',
  templateUrl: './deviceslist.component.html',
  styleUrls: ['../app.component.css'],
  providers: [DevicesService]
})
export class DevicesListComponent implements OnInit {
  title = 'List of SDN Devices';
  myData: Devices[];
  hostsData: Hosts[];
  constructor(public devicesService: DevicesService) { }
  ngOnInit(): void {
    //this.devicesService.GetDeviceList().subscribe((data: Devices[]) =>
    //  data.forEach(item => 
    //  ({
    //    id: item['id'],
    //    deviceType: item['deviceType'],
    //    manufacturer: item['mfr'],
    //    available: item['available']       
    //  })));
    //this.devicesService.GetDeviceList().subscribe((data) =>
    //  data.forEach(item =>
    //    this.myData.push({
    //    id: item['id'],
    //    deviceType: item['deviceType'],
    //    manufacturer: item['mfr'],
    //    available: item['available']       
    //  })));
    //this.devicesService.GetDeviceList().subscribe((data) => {
    //  console.log(data); console.log(data.forEach(i => (
    //    {
    //      id: i['id'],
    //      deviceType: i['deviceType'],
    //      manufacturer: i['mfr'],
    //      available: i['available']
    //    }))); this.myData = data.forEach(i => (
    //    {
    //      id: i['id'],
    //      deviceType: i['deviceType'],
    //      manufacturer: i['mfr'],
    //      available: i['available']
    //    })) as any
    //});
    //this.devicesService.GetDeviceList().subscribe((data) => this.myData = data);
    this.devicesService.GetHostList().subscribe((data) => this.hostsData = data);
    console.log(this.hostsData);
  }
}

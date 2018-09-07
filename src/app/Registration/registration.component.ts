import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RegistrationService } from './registration.service';
@Component({
  selector: 'app-root',
  templateUrl: './registration.component.html',
  styleUrls: ['../app.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent {
  title = 'New Device Registration';
  addMessage = '';
  firstName = '';
  lastName = '';
  streetNo = '';
  street = '';
  suburb = '';
  postCode = '';
  state = 'NSW';
  category = 'P';
  userData = {};
  switchId = 'of:0000000000000001';
  port = this.registrationService.GetHosts();
  ipaddress = '10.0.0.' + this.port;
  macAddress = '00:00:00:00:00:' + this.port;
  deviceData = {
    "mac": this.macAddress,
    "vlan": "-1",
    "ipAddresses": [
      this.ipaddress
    ],
    "locations": [
      {
        "elementId": this.switchId,
        "port": this.port
      }
    ]
  };
  constructor(public registrationService: RegistrationService) { }

  addNewDevices()
  {
    this.userData = {
      "user": [
        {
          "id": "1",
          "name": this.firstName + ' ' + this.lastName,
          "address": this.streetNo + ' ' + this.street + ' ' + this.suburb + ' ' +  this.postCode,
          "state": this.state,
          "category": this.category
        }]
    };
    this.registrationService.AddHostDeviceData(this.userData);
    this.registrationService.AddHostDevice(this.deviceData);
    this.addMessage = 'Added';
  }
}

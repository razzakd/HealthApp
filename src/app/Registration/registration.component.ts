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
  services = '';
  state = 'NSW';
  category = 'P';
  userData = {};
  switchId = 'of:0000000000000001';
  port;
  ipaddress = '';
  macAddress = '';
  deviceData = {};

  constructor(public registrationService: RegistrationService) { }
  ngOnInit(): void {
    let padding = '0';
    this.registrationService.GetHosts().subscribe(
      data => {
        this.port = data.map(nrObj => nrObj).length;
        if (this.port == 0) {
          this.port = 101;//default
        }
        if (this.port < 10) {
          padding = padding + this.port;
        }
        else {
          padding = this.port;
        }
        this.ipaddress = '10.0.0.' + this.port;
        this.macAddress = '00:00:00:00:00:' + padding;
        this.deviceData = {
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
        console.log(this.deviceData);
      },
    );
  }
  addNewDevices()
  {
    let fileName = this.firstName + '_' + this.lastName;
    this.userData = {
      "user": [
        {
          "id": this.port,
          "name": this.firstName + ' ' + this.lastName,
          "address": this.streetNo + ' ' + this.street + ' ' + this.suburb + ' ' +  this.postCode,
          "state": this.state,
          "category": this.category,
          "services": this.services
        }]
    };
    this.registrationService.AddHostDeviceData(this.userData, fileName);
    //this.registrationService.AddHostDevice(this.deviceData);
    this.addMessage = 'Added';
  }
}

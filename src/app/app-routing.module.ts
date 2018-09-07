import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './Registration/registration.component';
import { DevicesListComponent } from './DevicesList/deviceslist.component';


const appRoutes: Routes = [
  { path: 'new-registration', component: RegistrationComponent },
  { path: 'list-hosts', component: DevicesListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

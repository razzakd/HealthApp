import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './Registration/registration.component';
import { DevicesListComponent } from './DevicesList/deviceslist.component';
import { MeterComponent } from './ConfigureMeter/meterlist.component';
import { LoginComponent } from './login/index';
import { HeaderComponent } from './Header/header.component';
import { AuthGuard } from './Auth/auth.guard';
import { HomeComponent } from './Home/home.component';

const appRoutes: Routes = [
  { path: 'new-registration', component: RegistrationComponent },
  { path: 'list-hosts', component: DevicesListComponent },
  { path: 'add-meters', component: MeterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

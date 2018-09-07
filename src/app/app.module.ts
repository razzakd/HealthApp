import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './interceptors/auth.service';
import { FormsModule } from '@angular/forms'; 

import { RegistrationComponent } from './Registration/registration.component';
import { DevicesListComponent } from './DevicesList/deviceslist.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    DevicesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

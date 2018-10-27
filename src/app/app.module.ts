import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './interceptors/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './Auth/auth.guard';
import { AuthenService } from './Auth/auth.service';

import { RegistrationComponent } from './Registration/registration.component';
import { DevicesListComponent } from './DevicesList/deviceslist.component';
import { MeterComponent } from './ConfigureMeter/meterlist.component';
import { LoginComponent } from './login/index';
import { HeaderComponent } from './Header/header.component';
import { HomeComponent } from './Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    DevicesListComponent,
    MeterComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
      FormsModule,
      BrowserModule,
      AppRoutingModule
  ],
  providers: [DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true
  }, AuthGuard, AuthenService],
  bootstrap: [AppComponent]
})
export class AppModule { }

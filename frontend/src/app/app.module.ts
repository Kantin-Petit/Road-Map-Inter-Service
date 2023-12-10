import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './_utils/error/error.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './timeline/planning/planning.component';
import { CommunicationComponent } from './timeline/communication/communication.component';
import { HeaderComponent } from './header/header.component';

import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';

import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    PlanningComponent,
    CommunicationComponent,
    HeaderComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SplitterModule,
    ReactiveFormsModule,
    TimelineModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

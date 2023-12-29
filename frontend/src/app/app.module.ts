import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './_utils/error/error.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './timeline/planning/planning.component';
// import { CommunicationComponent } from './timeline/communication/communication.component';
import { HeaderComponent } from './header/header.component';
import { UserRegistrationComponent } from './authentication/user-registration/user-registration.component';
import { UserLoginComponent } from './authentication/user-login/user-login.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { SidebarModule } from 'primeng/sidebar';
import { CommunicationComponent } from './timeline/communication/communication.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { JsonEditorComponent } from './json-editor/json-editor.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    PlanningComponent,
    HeaderComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    CommunicationComponent,
    SidebarComponent,
    // JsonEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    HttpClientModule,
    SplitterModule,
    ReactiveFormsModule,
    TimelineModule,
    CardModule,
    TableModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    FormsModule, 
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    MessageModule,
    SidebarModule,
    FileUploadModule,
  ],
  providers: [
    [{ provide: LOCALE_ID, useValue: 'fr' }],
    MessageService, 
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

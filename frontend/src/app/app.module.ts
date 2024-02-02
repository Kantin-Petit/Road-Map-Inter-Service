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
import { HomeComponent } from './pages/home/home.component';
import { PlanningComponent } from './timeline/planning/planning.component';
import { HeaderComponent } from './header/header.component';
import { UserLoginComponent } from './authentication/user-login/user-login.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { SidebarModule } from 'primeng/sidebar';
import { CommunicationComponent } from './timeline/communication/communication.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { FilterComponent } from './filter/filter.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlanningComponent,
    HeaderComponent,
    UserLoginComponent,
    CommunicationComponent,
    SidebarComponent,
    ConnexionComponent,
    FilterComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    HttpClientModule,
    AccordionModule,
    SplitterModule,
    DialogModule,
    ReactiveFormsModule,
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

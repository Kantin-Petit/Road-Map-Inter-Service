import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './services/interceptor.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanningComponent } from './timeline/planning/planning.component';
import { CommunicationComponent } from './timeline/communication/communication.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterComponent } from './filter/filter.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ConnexionComponent,
    PlanningComponent,
    CommunicationComponent,
    SidebarComponent,
    FilterComponent,
    ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    MessageModule,
    SidebarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

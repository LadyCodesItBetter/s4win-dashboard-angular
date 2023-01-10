/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {LocalStorageService} from './shared/services/storage.service';
import {NbPasswordAuthStrategy, NbAuthModule, NbAuthSimpleToken} from '@nebular/auth';
import {RequestInterceptor} from './shared/interceptor/request.interceptor';
import {environment} from '../environments/environment';
import {HttpErrorInterceptor} from './shared/interceptor/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.baseUrl,
          login: {
            endpoint: '/auth/login',
            method: 'post',
            redirect: {
              success: '/dashboard/', // welcome page path
              failure: '/ops/', // stay on the same page
            },
          },
          logout: {
            endpoint: '/auth/logout',
            alwaysFail: false,
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
          },
          token: {
            class: NbAuthSimpleToken,
            key: 'token',
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    LocalStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

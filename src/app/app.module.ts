import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { ContactsFilterPipe } from './shared/contacts.pipe';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  // AmazonLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    CommonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '819875380962-jq2eis9mab5p80e46ccq6k6qfeliq34m.apps.googleusercontent.com'
            ),
          },
          // {
          //   id: AmazonLoginProvider.PROVIDER_ID,
          //   provider: new AmazonLoginProvider(
          //     'amzn1.application-oa2-client.f074ae67c0a146b6902cc0c4a3297935'
          //   ),
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('808839069929003'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ClaimComponent } from './pages/claim/claim.component';
import { KoloboksComponent } from './pages/koloboks/koloboks.component';
import { BreedingComponent } from './pages/breeding/breeding.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

import { TimerCountDownComponent } from './components/TimerCountDown/TimerCountDown.component';
import { MainService } from './services/main.service';
import { environment } from '../environments/environment';
import { appRoutes } from './main.router';

/********** Custom option for ngx-translate ******/
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { LoginEOSModule } from 'eos-ulm';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KoloboksComponent,
    TimerCountDownComponent,
    ClaimComponent,
    BreedingComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
       loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
       }
    }),
    LoginEOSModule.forRoot({
          appName: 'Kolobok',
          httpEndpoint: environment.Eos.httpEndpoint,
          chain: environment.chain,
          verbose: environment.Eos.verbose,
          blockchain: environment.network.blockchain,
          host: environment.network.host,
          port: environment.network.port,
          protocol: environment.network.protocol,
          expireInSeconds: environment.network.expireInSeconds
    }),
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [TranslateModule],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router'
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import { LoginEOSService } from 'eos-ulm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(public scatterService: MainService, 
              public translate: TranslateService,
              private http: HttpClient, 
              public router: Router,
              public loginEOSService: LoginEOSService
             ){
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang(this.lang);

    const browserLang = translate.getBrowserLang();
    translate.use( (browserLang.match(/en|zh/) && !this.lang) ? browserLang : this.lang);
  }
	
  moment = moment;
  version = environment.version;
  configStyle = environment.style;
  lang = localStorage.getItem('lang') || 'en';

  translateLang(lang){
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }   

	ngOnInit(){}

}

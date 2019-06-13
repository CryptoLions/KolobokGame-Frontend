import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';

import { environment } from '../../../environments/environment';
import { LoginEOSService } from 'eos-ulm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private scatterService: MainService, 
              private router: Router, 
              public loginEOSService: LoginEOSService
  ){}
  config = environment;  

  ngOnInit(){
       if (this.loginEOSService.accountName){
           this.router.navigate(['koloboks']);
       }
       this.loginEOSService.loggedIn.subscribe(res => {
           this.router.navigate(['koloboks']);
       })
  }

}

import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { LoginEOSService } from 'eos-ulm';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.css']
})
export class BreedingComponent implements OnInit {

  constructor(private scatterService: MainService, public loginEOSService: LoginEOSService){}
  config = environment;
  itemsArr: any;
  moment = moment;
  breedingArr = [];
  babyName = '';
  dateNow = +new Date();
  
  getItems(){
      this.scatterService.getBabiesTable()
                       .then(async (res: any) => {
                             this.itemsArr = res.rows;
                       })
                       .catch(err => console.error(err));
  }

  ngOnInit(){
    if (this.loginEOSService.accountName){
        this.getItems();
    }
    this.loginEOSService.loggedIn.subscribe(res => {
        this.getItems();
    });
  }

}

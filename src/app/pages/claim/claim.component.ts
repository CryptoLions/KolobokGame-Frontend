import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { LoginEOSService } from 'eos-ulm';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  constructor(private scatterService: MainService, public loginEOSService: LoginEOSService){}
  config = environment;
  itemsArr: any;
  moment = moment;
  breedingArr = [];
  babyName = '';
  dateNow = +new Date();
  
  getItems(){
      this.scatterService.getClaimItems()
                       .then(async (res: any) => {
                             this.itemsArr = [];
                             for (let elem of res.rows){
                                   let asset: any = await this.scatterService.getAssetById(elem.assetid, elem.owner);
                                   this.itemsArr.push(this.scatterService.createProductStructure(asset.rows[0]));
                             }
                       })
                       .catch(err => console.error(err));
  }

  claim(elem){
        this.scatterService.claimItem(elem);
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

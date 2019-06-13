import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { LoginEOSService } from 'eos-ulm';

@Component({
  selector: 'app-koloboks',
  templateUrl: './koloboks.component.html',
  styleUrls: ['./koloboks.component.css']
})
export class KoloboksComponent implements OnInit {

  constructor(public scatterService: MainService, private router: Router, public loginEOSService: LoginEOSService){}
  config = environment;
  itemsArr: any;
  moment = moment;
  breedingArr = [];
  babyName = '';
  dateNow = +new Date();
  breedingInfo = {};

  getItems(){
      this.scatterService.getAvailableItems()
                       .then(res => {
                             this.itemsArr = res.rows.map(elem => {
                                 return this.scatterService.createProductStructure(elem);
                             });
                       })
                       .catch(err => console.error(err));
  }

  addForBreed(item){
      if (this.breedingArr.length < 2){
            this.breedingArr.push(item);
            this.itemsArr.forEach((elem, index) => {
                if (elem.id === item.id){
                    this.itemsArr.splice(index, 1);
                }
            });
      }
      if (this.breedingArr.length === 2){
          this.breedingInfo = this.scatterService.countCooldownTimes(this.breedingArr[0], this.breedingArr[1]);
          console.log(this.breedingInfo, 'this.breedingInfo');
      }
  }

  dhms(sec) {
      if (sec && sec > 0) {
         let humanTimings = this.scatterService.dateHuman(sec);
         let hm = '';
         for (let k in humanTimings){
            hm = `${hm} ${humanTimings[k].time}${humanTimings[k].label}`;
         }
         return hm;  
      }
      return '0 sec';
  }

  countAge(date){
      let age = (this.dateNow - +new Date(date * 1000)) / 1000 / 60; // minutes
      if (age < 0){
          return `${age * 60} sec.`;
      }
      if (age > 0 && age < 60){
          return `${Math.floor(age)} minute(s)`;
      }
      if (age > 60 && age / 60 < 24){
          return `${Math.floor(age / 24)} hour(s)`;
      }
      if (age / 60 > 24 && age / 60 / 24 < 30){
          return `${Math.floor(age / 60 / 24)} day(s)`;
      }
      if (age / 60 / 24 > 24 && age / 60 / 24 / 30 < 12){
          return `${Math.floor(age / 60 / 24 / 30)} month(s)`;
      }
      return `${Math.floor(age / 60 / 24 / 30 / 12)} year(s)`;
  }

  removeForBreed(item){
      this.itemsArr.push(item);
      this.breedingArr.forEach((elem, index) => {
          if (elem.id === item.id){
              this.breedingArr.splice(index, 1);
          }
      });
  }

  burnKolobok(item){
      this.scatterService.burn(item);
  }

  breed(){
       this.scatterService.breeding(this.breedingArr, this.babyName);
  }

  ngOnInit(){
    if (this.loginEOSService.accountName){
        this.getItems();
    }
    console.log(this.router.url, this.loginEOSService.connected)
    if(!this.loginEOSService.connected && this.router.url === '/koloboks'){
        return this.router.navigate(['/']);
    }
    this.loginEOSService.loggedIn.subscribe(res => {
        this.getItems();
    });
  }

}

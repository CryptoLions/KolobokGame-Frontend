import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LoginEOSService } from 'eos-ulm';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  accountName: any = '';
  navigator: any = navigator;
  ScatterJS;
  loggedIn = new EventEmitter<boolean>();
  initCounterErr = 0;
  languages = {
      'en': 'EN',
      'zh': '中文'
  };

  constructor(private router: Router,
              private http: HttpClient,
              public loginEOSService: LoginEOSService) {
  }

  returnEosNet() {
       return this.loginEOSService.eos;
  }

  breeding(items, name) {
        this.loginEOSService.eos.contract(environment.gcontract, {
            accounts: [environment.network]
        }).then(contract => {
              contract.breed(this.loginEOSService.accountName, items[0].id, items[1].id, name, this.loginEOSService.options)
                      .then((result: any) => {
                           this.router.navigate(['breeding']);
                      }).catch(err => {
                           this.loginEOSService.contractError(err);
                      });
        }).catch(err => {
            this.loginEOSService.contractError(err);
        });
  }

  burn(item) {
        this.loginEOSService.eos.contract(environment.asset, {
            accounts: [environment.network]
        }).then(contract => {
              contract.burn(this.loginEOSService.accountName, [item.id], `burn Kolobok ${item.name} :(`, this.loginEOSService.options)
                      .then((result: any) => {
                           location.reload();
                      }).catch(err => {
                           this.loginEOSService.contractError(err);
                      });
        }).catch(err => {
            this.loginEOSService.contractError(err);
        });
  }

  claimItem(data: any){
        this.loginEOSService.eos.contract(environment.asset, {
            accounts: [environment.network]
        }).then(contract => {
            contract.claim(this.loginEOSService.accountName, [`${data.id}`], this.loginEOSService.options)
                    .then(result => {
                         console.log(result);
                         //this.router.navigate(['koloboks']);
                         location.reload();
                    }).catch(err => {
                         this.loginEOSService.contractError(err);
                    });
        }).catch(err => {
            this.loginEOSService.contractError(err);
        });
  }

  rename(event, assetId) {
      if (event.code === 'Enter'){
        let newName = event.target.value;
        console.log(this.loginEOSService.accountName, assetId, newName);
        this.loginEOSService.eos.contract(environment.gcontract, {
            accounts: [environment.network]
        }).then(contract => {
              contract.rename(this.loginEOSService.accountName, assetId, newName, this.loginEOSService.options)
                      .then((result: any) => {
                           location.reload()
                      }).catch(err => {
                           this.loginEOSService.contractError(err);
                      });
        }).catch(err => {
            this.loginEOSService.contractError(err);
        });
      }
        
  }

  getAvailableItems() {
      return this.loginEOSService.eos.getTableRows({  json: true,
                                       code:  environment.asset,
                                       scope: this.loginEOSService.accountName,
                                       table: environment.tables.assets,
                                       table_key: 'author',
                                       index_position: 2,
                                       key_type: "i64",
                                       lower_bound: environment.gcontract,
                                       upper_bound: environment.gcontract + 'a',
                                       limit: 200 });
  }

  getClaimItems() {
      return this.loginEOSService.eos.getTableRows({  json: true,
                                       code:  environment.asset,
                                       scope: environment.asset,
                                       table: environment.tables.claims,
                                       table_key: 'offeredto',
                                       index_position: 3,
                                       key_type: "i64",
                                       lower_bound: this.loginEOSService.accountName,
                                       upper_bound: this.loginEOSService.accountName + 'a',
                                       limit: 200 });
  }

  getBabiesTable() {
      return this.loginEOSService.eos.getTableRows({  json: true,
                                       code:  environment.gcontract,
                                       scope: environment.gcontract,
                                       table: environment.tables.babies,
                                       table_key: 'owner',
                                       index_position: 2,
                                       key_type: "i64",
                                       lower_bound: this.loginEOSService.accountName,
                                       upper_bound: this.loginEOSService.accountName + 'a',
                                       limit: 200 });
  }

  async getAssetById(id, owner) {
      let asset = await this.loginEOSService.eos.getTableRows({  json: true,
                                                 code:  environment.asset,
                                                 scope: owner,
                                                 table: environment.tables.assets,
                                                 table_key: 'id',
                                                 lower_bound: `${id}`,
                                                 upper_bound: `${id}`,
                                                 limit: 1 });
      return asset;
  }

  getAccount() {
      return this.loginEOSService.eos.getAccount({
              account_name: this.loginEOSService.accountName
      });
  }

  createProductStructure(elem) {
      if (!elem){
         return;
      }
      try {
         elem.idata = JSON.parse(elem.idata);
         elem.mdata = JSON.parse(elem.mdata);
      } catch (e) {
         console.log(e);
      }
      elem.info = {};
      this.generateInfo(elem.mdata, elem.info);
      this.generateInfo(elem.idata, elem.info);
      return {
            id: elem.id || elem.assetId,
            name: (elem.info) ? elem.info.name : '',
            image: (elem.info) ? elem.info.img : '',
            category: elem.category,
            type: elem.category,
            idata: elem.idata,
            mdata: elem.mdata,
            description: (elem.info) ? elem.info.desc : '',
            author: elem.author,
            owner: elem.owner,
      };
  }
  generateInfo(obj, info) {
      Object.keys(obj).forEach(key => {
          if (key === 'name') {
             info['name'] = obj.name;
          }
          if (key === 'desc') {
             info['desc'] = obj.desc;
          }
          if (key === 'img') {
             info['img'] = obj.img;
          }
      });
  }

   dhms(sec) {
      if (sec && sec > 0) {
         let humanTimings = this.dateHuman(sec);
         let hm = '';
         for (let k in humanTimings){
            hm = `${hm} ${humanTimings[k].time}${humanTimings[k].label}`;
         }
         return hm;  
      } else {
         return '0 sec';
      }
   }

  dateHuman(sec) {
         var sec_ = sec;

         var TIMING_SHORT = {y:"y", m:"mo", w:"w", d:"d", h:"h", min:"m", s:"s"};
         var timeUnits = [];
         timeUnits['31536000'] = TIMING_SHORT.y; //'y';
         timeUnits['2592000'] = TIMING_SHORT.m; //'m';
         timeUnits['604800'] = TIMING_SHORT.w; //'w';
         timeUnits['86400'] = TIMING_SHORT.d; //'d';
         timeUnits['3600'] = TIMING_SHORT.h; //'h';
         timeUnits['60'] = TIMING_SHORT.min; //'min';
         timeUnits['1'] = TIMING_SHORT.s; //'sec';
      
         var humanTiming = {};
         var humanTimings = [];
         var unit = 31536000;
      
         var let_ = timeUnits[unit]; //"y";
         if (sec > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['y'] = {time: numberOfUnits, label: let_};
         }
         unit = 2592000; let_=timeUnits[unit]; //"m";
         if (sec > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['m'] = {time: numberOfUnits, label: let_};
         }
         unit = 86400; let_=timeUnits[unit]; //"d";
         if (sec > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['d'] = {time: numberOfUnits, label: let_};
         }
         unit = 3600; let_=timeUnits[unit]; //"h";
         if (sec > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['h'] = {time: numberOfUnits, label: let_};
         }
         unit = 60; let_=timeUnits[unit]; //"min";
         if (sec > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['min'] = {time: numberOfUnits, label: let_};
         }
         unit = 1; let_=timeUnits[unit]; //"sec";
         if (sec_ > unit) {
            var numberOfUnits = Math.floor(sec / unit);
            sec -= unit * numberOfUnits;
            humanTimings['sec'] = {time: numberOfUnits, label: let_};
         }
         return humanTimings; 
   }

  countCooldownTimes(parentF, parentS){
      let dateNow = +new Date() / 1000;
      console.log(parentF, parentS);
      let breedingTime = this.dhms(600 + (parentF.mdata.kids + parentS.mdata.kids) * ( (parentF.mdata.kids + parentS.mdata.kids) <= 3 ? 3600 : 21600));
      let ageF = dateNow - parentF.idata.bdate;
      let ageKF = 3600;
      if (ageF >= 10 * 24 * 3600 && ageF <= 30 * 24 * 3600){
          ageKF = 7200;
      }
      if (ageF > 30 * 24 * 3600){
          ageKF = 14400;
      }
      let restingF = this.dhms(1800 - parentF.mdata.kids * 60 + ageKF);
      
      let ageS = dateNow - parentS.idata.bdate;
      let ageKS = 3600;
      if (ageS >= 10 * 24 * 3600 && ageS <= 30 * 24 * 3600){
          ageKS = 7200;
      }
      if (ageS > 30 * 24 * 3600){
          ageKS = 14400;
      }
      let restingS = this.dhms(1800 - parentS.mdata.kids * 60 + ageKS);
      
      let generation = Math.round(((parentF.idata.gen+1) + (parentS.idata.gen+1)) / 2);
      let growingTime = this.dhms(600 + generation * 3600);

      return {breedingTime, restingF, restingS, growingTime, generation};
  }

// ==== service end
}






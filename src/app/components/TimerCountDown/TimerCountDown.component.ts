import {interval as observableInterval} from 'rxjs';

import {map} from 'rxjs/operators';

import { Component, ElementRef, OnInit, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MainService } from '../../services/main.service';

@Component({
    selector: 'countdown',
    templateUrl: './TimerCountDown.component.html',
    styleUrls: ['./TimerCountDown.component.scss'],
})

export class TimerCountDownComponent implements OnInit, OnDestroy {

   @Input() dateTime: any;

   private future: Date;
   private futureString: string;
   private diff: number;
   private $counter: Observable<number>;
   private subscription: Subscription;
   private message: string;

   humantime: any;

   constructor(private MainService: MainService) {}

   dhms(sec) {
      if (sec && sec > 0) {
         let humanTimings = this.MainService.dateHuman(sec);
         let hm = '';
         for (let k in humanTimings){
            hm = `${hm} ${humanTimings[k].time}${humanTimings[k].label}`;
         }
         this.humantime = hm;  
      } else {
         this.humantime = '0 sec';
         this.subscription.unsubscribe();
         location.reload();
      }
   }

   ngOnInit() {
      if (this.dateTime) {
         this.future = new Date(this.dateTime * 1000);
         this.$counter = observableInterval(1000).pipe(map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
         }));

         this.subscription = this.$counter.subscribe((x) => this.dhms(this.diff));
      }
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}

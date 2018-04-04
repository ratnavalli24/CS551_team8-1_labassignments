import { Component } from '@angular/core';

import {PeopleServiceProvider} from '../../providers/shopping/shopping';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PeopleServiceProvider]

})

export class HomePage {
 public trail:any;

  constructor(public navCtrl: NavController, public peopleservice: PeopleServiceProvider, public sentiment: SentimentProvider) {
    this.shopmalls();

  }

  shopmalls(){
    this.peopleservice.load().
    then(data => {
      this.trail = data;
    });
}
      sentiment1(){
        this.sentiment.load().
        then(data => {
          this.sentiment = data;

    });

  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SentimentProvider {
  data:any
  constructor(public http: Http) {
    console.log('Hello SentimentProvider');
  }
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    $Scope.Review={{details.review}}
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=49d42a08b29490c409f92d6389f3292afce91968&outputMode=json&text="+($scope.Review)')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          // this.data = data.response.venues[0];


          this.data = data.docSentiment.score;

          resolve(this.data);






        });
    });




  }



}

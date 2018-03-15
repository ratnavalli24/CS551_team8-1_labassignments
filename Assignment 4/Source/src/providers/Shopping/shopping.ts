import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {
data:any
  constructor(public http: Http) {
    console.log('Hello PeopleServiceProvider Provider');
  }
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://api.foursquare.com/v2/venues/search?client_id=YB52JSCAS1RJLKWGR42RODTDAOWH1D5IUWYZULBS5VW5ZH4A&client_secret=BJHLZSJ22ZRNT4YDIOQWKGIEMKVRDYQCCJVMITEWJ0CHXQL4&v=20160215&limit=15&near=chicago&query=shopping')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
         // this.data = data.response.venues[0];


          this.data = data.response.venues;

          resolve(this.data);






        });
    });




}



}

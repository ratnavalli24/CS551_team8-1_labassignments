import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeopleServiceProvider } from '../providers/shopping/shopping';
import { SentimentProvider } from '../providers/shopping/sentiment';
import { Signup } from "../pages/signup/signup";
import { Source } from "../pages/source/source";
import { Userpage} from "../pages/userpage/userpage";


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: [PeopleServiceProvider,SentimentProvider,Signup,Source,Userpage]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


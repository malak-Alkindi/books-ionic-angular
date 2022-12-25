import { Component } from '@angular/core';

import { IonGrid, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthGuard} from './guard/auth.guard';

import { AuthservService } from './services/authserv.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthservService,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
    this.handleSplashScreen()
  }
  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      console.error('Platform initialization bug')
    }

    // Any operation that shoud be performed BEFORE showing user UI,
    // in a real App that may be cookie based authentication check e.g.
    // await this.authProvider.authenticate(...)

    // fade out and remove the #splash-screen
   // const splash = document.getElementById('splash-screen')
 //   splash.style.opacity = '0'
  //  setTimeout(() => { splash.remove() }, 300)
  }
/////////////////////////////////////////////////////////
  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.getUserDatafromStorage().then(()=>{
        if(this.authService.isLoggedIn){
        if(this.authService.userData.usertype=='Admin'){
         
         
             this.navCtrl.navigateForward('tappage/home');
        }}
        else {
          this.navCtrl.navigateForward('addroom');
        }
     
        
      });
    });
  }
}


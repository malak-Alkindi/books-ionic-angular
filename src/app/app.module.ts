
//import { TabspagePage } from './tabspage/tabspage.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

import { NgxImageCompressService } from 'ngx-image-compress';
import { environment } from './../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { IonicStorageModule } from '@ionic/storage-angular';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
//import {AlertservService} from './servs/alertserv.service';
import {AlertService} from './services/alert.service'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CalendarModule } from "ion2-calendar";
import { AuthservService } from '../app/services/authserv.service';
import {AuthGuard} from './guard/auth.guard';
import{CartService} from  './services/cart.service'
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';
//import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
/////////pages ////////////

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    NgCalendarModule ,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicStorageModule, 
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    CalendarModule,
   
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AlertService,
    AuthservService,
    StatusBar,
    SplashScreen,
    AuthGuard,
    NgxImageCompressService,
   // LocalNotifications,
    CartService,
   
   Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { AuthservService } from '../../../app/services/authserv.service';
import * as firebase from 'firebase/app';
//import { LocalNotifications ,ILocalNotification} from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
///////////////////////////////////////// المتغيرات........................................
public userObj: any = {
  "email": "",
  "password": ""
}
public wait:boolean=false;
/////////////////////////////////////////الكونستركتر........................................
constructor(
  //private lo: LocalNotifications,
  private Alertserv: AlertService,
  private afAuth: AngularFireAuth,
  private afDatabase: AngularFireDatabase,
  private navCtrl: NavController,
  private authService: AuthservService,
  public alertController: AlertController,) { }
/////////////////////////////////////////  الانجي اون انت ........................................
ngOnInit() {
  
}
/////////////////////////////////////////  اسجل الدخول ........................................
async validateUser() {
 
    this.wait=true

    this.afAuth.signInWithEmailAndPassword(this.userObj.email, this.userObj.password)
      .then((data) => {
        console.log(data)
        this.afDatabase.object('users/' + data.user.uid).valueChanges()
        .subscribe((userobjDB: any) => {
          this.authService.setDatatoStorage(userobjDB).then(() => {
            this.wait=false
           
            if (userobjDB.usertype == 'Admin') {

              this.navCtrl.navigateForward('tappage/home');
            }
           else { this.navCtrl.navigateForward('login');}

          }).catch((error) => {
            this.wait=false
            this.Alertserv.ok('1'+error.code);
            if(error.code=="auth/user-not-found"){
              this.Alertserv.ok("هذا الايميل غير مسجل");}
           })
          

 }),((error) => {
        this.wait=false
        this.Alertserv.ok('1'+error.code);
        if(error.code=="auth/user-not-found"){
          this.Alertserv.ok("هذا الايميل غير مسجل");
       }
       } )
      }).catch((error) => {
        this.wait=false
        this.Alertserv.ok('1'+error.code);
        if(error.code=="auth/user-not-found"){
          this.Alertserv.ok("هذا الايميل غير مسجل");
       }
       } )
      

          }
         
   
      
        

}
/////////////////////////////////////////   اعاده تعيين كلمه المرور ........................................




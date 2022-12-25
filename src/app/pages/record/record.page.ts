import { AuthGuard } from './../../guard/auth.guard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IonSlides } from '@ionic/angular';
import { AlertService } from '../../services/alert.service'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
//-------------------- varibles --------------------
public wait: boolean = false;
public catarray: any = [];
m:any =''
y:any =''
  //-------------------- constructor --------------------
  constructor(public alertController: AlertController,
    private afStorage: AngularFireStorage,
    private Alertserv: AlertService,
    private navCtrl: NavController,
    public storage: Storage,
    private afdb: AngularFireDatabase,) { }

   //-------------------- ngonint()------------------------
   ngOnInit() {
    this.m = moment(Date.now()).format('M') 
    this.y = moment(Date.now()).format('YYYY') 
    let y=JSON.stringify( moment(Date.now()).format('YYYY') )
    this.wait = true
    this.afdb.list('record/' +JSON.stringify(this.m) + "/").valueChanges().subscribe((dbarray) => {
   
      this.catarray = dbarray

      console.log(dbarray)
              this.wait = false
          

    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });

  }
total(){
  let hi=0
  this.catarray.forEach(e => {
     hi = hi + Number(e.price)
  });
  return hi
}
//-----------------go to the room end the resv -----------------------
goend(i) {


  let navExtras: NavigationExtras = {
    queryParams: i,

  }
  this.navCtrl.navigateForward('ended', navExtras);


}
//------------------------- delte the event ----------------------
del(){
 
  this.wait = true
  this.afdb.list('record/' )
    .remove(JSON.stringify(this.m)).then(() => {
          this.wait = false
          this.Alertserv.ok('تم  مسح السجل ')
    }).catch((error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    })
}

}

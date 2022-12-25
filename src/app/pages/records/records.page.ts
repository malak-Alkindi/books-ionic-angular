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
import { AuthGuard } from './../../guard/auth.guard';
import { Console } from 'console';
@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {
  public wait: boolean = false;
  public arry: any = [];
  
  public searcharray:any=[]
  public day: number ;
  public month: number ;
  public year: number ;
  public show:boolean=false;
    //-------------------- constructor --------------------
    constructor(public alertController: AlertController,
      private afStorage: AngularFireStorage,
      private Alertserv: AlertService,
      private navCtrl: NavController,
      public storage: Storage,
      private afdb: AngularFireDatabase,) { }

  ngOnInit() {
    this.wait = true
    this.afdb.list('record').valueChanges().subscribe((dbarray) => {
   
      this.arry = dbarray
      this.arry.forEach(e => {
        if (e.date=="92022"){
      

          this.arry.push(e)
        }
});
  

              this.wait = false
          

    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });

  }
  searchdate(){
    this.afdb.list('record', ref => ref.orderByChild('record').equalTo('3')).valueChanges().subscribe((proarray) => {
       console.log(proarray)
    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });
  
  }
}

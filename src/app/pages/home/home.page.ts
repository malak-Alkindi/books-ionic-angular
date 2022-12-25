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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //-------------------- varibles --------------------
  public wait: boolean = false;
  public catname: any;
  public catarray: any = [];
  public price: number;
  public ttlbooks: any = []
  public date: any = []
  public endedtoday: any = []
  public notaprov: any = []
  public allresv: any = []

  //-------------------- constructor --------------------
  constructor(public alertController: AlertController,
    private afStorage: AngularFireStorage,
    private Alertserv: AlertService,
    private navCtrl: NavController,
    public storage: Storage,
    private afdb: AngularFireDatabase,) { }


   
  //-------------------- ngonint()------------------------
  ngOnInit() {
  
 

    this.ttlbooks = []
    this.endedtoday = []
    this.notaprov = []
    this.allresv = []
    this.wait = true
    this.afdb.list("new").valueChanges().subscribe((dbarray) => {
      this.ttlbooks = []
      this.endedtoday = []
      this.notaprov = []
      this.allresv = []
      this.catarray = dbarray

      this.catarray.forEach((h, index) => {
        if (h.books != '') {
          this.afdb.list("new/" + h.catname + "/books").valueChanges().subscribe((ddbarray) => {
            if(ddbarray.length>0){
              this.date = ddbarray
            }
            else{
            this.date = [] }
            this.date.forEach(e => {




              var istoday = moment(JSON.parse(e.endTime)).format('DD/MM/YYYY') == moment(Date.now()).format('DD/MM/YYYY')

              var isnotoday = moment(JSON.parse(e.endTime)).isBefore(Date.now())


              if (!isnotoday && e.check && !istoday) {
                this.allresv.push(e)
              }
              if (isnotoday && e.check) {
                this.ttlbooks.push(e)
              }
              if (istoday && e.check && !isnotoday) {
                this.endedtoday.push(e)

              }
              if (!e.check) {
                this.notaprov.push(e)

              }

              this.wait = false
            });
          }, (error) => {
            this.wait = false
            this.Alertserv.ok(error.message)
          });
        }
      })

    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });

  }

  //-----------------go to the room confirm the resv -----------------------
  gobook(i) {

    let navExtras: NavigationExtras = {
      queryParams: i
    }
    this.navCtrl.navigateForward('checkroom', navExtras);


  }
 //-----------------go to the room end the resv -----------------------
  goend(i) {


    let navExtras: NavigationExtras = {
      queryParams: i,

    }
    this.navCtrl.navigateForward('ended', navExtras);


  }
//-------------------- log out -------------
logout(){
  this.Alertserv.presentAlertConfirm()
}
 
}


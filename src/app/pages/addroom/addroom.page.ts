import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IonSlides } from '@ionic/angular';
import { AlertService } from '../../services/alert.service'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.page.html',
  styleUrls: ['./addroom.page.scss'],
})
export class AddroomPage implements OnInit {
  public wait: boolean = false;
  public catname:any;
public catarray:any=[];
public price :number;
  constructor( public alertController: AlertController,
    private afStorage: AngularFireStorage,
    private Alertserv: AlertService,
    private navCtrl: NavController,
    public storage: Storage,
    private afdb: AngularFireDatabase,) { }

  ngOnInit() {
  
    this.wait = true
    this.afdb.list("new").valueChanges().subscribe((dbarray)=>{
      this.wait = false
      this.catarray=dbarray
    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });

  }
gobook(i){
 let navExtras:NavigationExtras={
      queryParams:i
    }
    this.navCtrl.navigateForward('available',navExtras);
}



}


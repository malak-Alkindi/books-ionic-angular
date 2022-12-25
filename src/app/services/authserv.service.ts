import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthservService {


  isLoggedIn: boolean = false;
  userData: any;
  isuserlogedin: boolean = false;

  constructor(private storage: Storage,
    private navCtrl: NavController) { }

  
  getUserDatawithoutStateChange(){
    this.storage.create() //loged in
    return this.storage.get('USER_INFO');
  }

  getUserDatafromStorage() {//user login
    this.storage.create()
    return this.storage.get('USER_INFO').then((data) => {
      this.userData=data;
      if(this.userData != null){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    }).catch((error)=>{
      this.userData=null;
      this.isLoggedIn=false;
    });
  }

  setDatatoStorage(data) {
    this.storage.create()
    return this.storage.set('USER_INFO', data).then(()=>{
      this.isLoggedIn=true;
      this.userData=data;
    }).catch((error)=>{
      this.isLoggedIn=false;
    });
  }

  logout() {
    this.storage.create()
    return this.storage.remove('USER_INFO').then(() => {
      this.isLoggedIn=false;
      this.userData=null;
    });
  }
}

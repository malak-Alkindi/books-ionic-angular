import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthservService } from '../services/authserv.service';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public loading:any;
  public toast:any;
  public alert:any;

  

  constructor(
    public authserv: AuthservService,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    
    ) { }

  async ok(msg) {
    this.alert = await this.alertController.create({
      message: msg,
      buttons: ['حسنا'],
    });

    await this.alert.present();
  }

  async t(msg) {
    this.toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    
    });
    this.toast.present();
  }

  async load() {
    this.loading = await this.loadingController.create({
      message: '.....الرجاء الانتظار',
    
    });
    await this.loading.present();

   
  }

  async dismissLoading(){
      this.loading.dismiss();
  }
 
  
  async loginornot(msg) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = msg;
    alert.buttons = [
      
      {
        text: 'تسجيل الدخول',
        cssClass: 'secondary',
        handler: () => {
         
        }

        
      },
      {
        text: 'تسجيل',
        handler: () => {
          this.navCtrl.navigateForward('register');
        }
        
      },
      {
        text: 'متابعه التصفح بدون تسجيل',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }

        
      }, 
    ];
  
    document.body.appendChild(alert);
    return alert.present();
}


async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
  
    message: 'هل انت متاكد انك تريد تسجيل الخروج ؟',
    buttons: [
      {
        text: 'لا',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'نعم',
        handler: () => {
          this.authserv.logout().then(() => {
            this.navCtrl.navigateRoot('login'); //user roo insted of forward cuz it delete all logein data wile forward
          }); //...the page will still loged in
        }
      }
    ]
  });

  await alert.present();
}
}
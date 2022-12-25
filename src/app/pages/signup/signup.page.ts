import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Platform } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public wait:boolean=false;
  //////////////////////// المتغيرات.............................
  public regObj: any = {
   
    "email": "",
    "password": "",
    "usertype": '',
    "uid": ""
  }
public pass2:any=''
  public checkobj:any={
    "email":""
  }
  public check = []
public emailcheack:any=''
   ////////////////////////  الكونستركتر   .............................
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private Alertserv: AlertService,
    private navCtrl:NavController) { }

      ////////////////////////  الانجي او ليت   .............................
  ngOnInit() {
    document.documentElement.dir = "rtl"
  }

    ////////////////////////  اشيك الايميل اذا مطابق المواصفات    .............................
    checkemail(){
      
          this.check.push(this.checkobj.email)
          let  x=document.getElementById('p')
      this.check.filter((i: any) => {
        if (i.indexOf('@admin.com') > -1)
         
       {
          this.regObj.email=this.checkobj.email
          x.style.borderBottom='none'
        }
        else {
        
        
         x.style.borderBottom='1px solid red'
          // change text color to white
          
        }
      })
      
    }
  ////////////////////////  فتح حساب   .............................
  async createAccount() {

    if (this.regObj.firstname == '') {
      this.Alertserv.t("ألرجاء ادخال اسمك ");
    } else if (this.regObj.lastname == '') {
      this.Alertserv.t("الرجاء ادخال قبيلتك");
    }
    else if (this.regObj.email == '') {

      this.Alertserv.t("ألرجاء ادخال بريدك الاكتروني");
    } else if (this.regObj.password == '') {
      this.Alertserv.t("الرجاء ادخال كلمه المرور");
    }
    else if (this.regObj.password != this.pass2) {
      this.Alertserv.t(" كلمات المرور غير متطابقه  ");
    }
    else {
     
      this.wait=true

          this.afAuth.createUserWithEmailAndPassword(this.regObj.email, this.regObj.password)
            .then((data) => {

              this.regObj.uid = data.user.uid;
              delete this.regObj.password;
              this.afAuth.currentUser.then((userdata) => {
                userdata.sendEmailVerification().then(() => {

                  this.afAuth.currentUser.then((userdata) => {
                    this.afDatabase.list('users').set(data.user.uid, this.regObj).then((userobj) => {
                      this.wait=false
                      this.Alertserv.ok("تم تسجيلك بنجاح ");
                      this.navCtrl.navigateForward('login');
this.checkobj.email=''
                      this.pass2 = ""
                      this.regObj = {}
                    }).catch((error) => {
                      this.wait=false
                      this.Alertserv.ok(error.message);
                    })

                  })
                    .catch((error) => {
                      this.wait=false
                      this.Alertserv.ok(error.message);
                    })
                })
                  .catch((error) => {
                    this.wait=false
                    this.Alertserv.ok(error.message);
                  })
              })
                .catch((error) => {
                  this.wait=false
                  this.Alertserv.ok(error.message);
                })
            })
            .catch((error) => {
              this.wait=false
              this.Alertserv.ok(error.message);
            })
        
       
     

    }
  }
  }
  

/*
  console.log(ev)
 let myArray=['#f0f8ff','#a2cffe','#edf1fe','#edf1fe','#a6e7ff','#c6e3f7','#d8e8e6',
 '#d8e8e6','#92cbf1','#74bbfb','#add8e6','#fdefe9','#efecde','#e3e7c4','#dbf4d8','#e8eae6',
 '#e5e9e1','#e5e2e7','#f4daf1','#f4daf1','#ddd6e1','#d9d9f3','#ffffc2','#f8f6d8']
 
 const element = document.getElementsByClassName("monthview-primary-with-event") as HTMLCollectionOf<HTMLElement>
 
 let i =0
 console.log(ev)
 for(i ; i<element.length;i++)
 { //element[i].style.backgroundColor = myArray[Math.floor(Math.random() * myArray.length)];
}
*/
import { Component,  OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthservService } from './../../services/authserv.service';

import { CartService } from './../../services/cart.service'
import { AlertService } from './../../services/alert.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireModule } from '@angular/fire/compat';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.page.html',
  styleUrls: ['./confirmorder.page.scss'],
})
export class ConfirmorderPage implements OnInit {
  
  //------------- varibles -------------------
  public name: any = ''
  public phonenumber: number;
  public roomno: number;
  public fdate: any;
  public sdate: any;
  public show: boolean = false;
  public showw: boolean = false;
  public notes: any = ''
  public wait: boolean = false
  public rest: number = 0;
  public roomprice: number;
  public days: any = 0
  myInputs = [];
  public i: any = []
  public catarray: any = [];
  public price: any
  public link: any = ''
  public whatslink: any = ''

  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  //-----------------constructor  ------------------------
  constructor(
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private afdb: AngularFireDatabase,
    private auth: AuthservService,
    public Alertserv: AlertService,
    private cartService: CartService,
    private navCtrl: NavController,
    public popover: PopoverController,
    private afStorage: AngularFireStorage,
    public storage: Storage,
    private imageCompress: NgxImageCompressService,
  ) {

  }
  //----------------- ng on init  ---------------------------
  ngOnInit() {

    this.route.queryParams.subscribe((resObj) => {
      this.i = resObj;


    });
    this.sdate = new Date(JSON.parse(this.i.startTime))
    this.fdate = new Date(JSON.parse(this.i.endTime))
  }


  //---------------------- add the room info to database 
    str :any=''
  addrefroom() {

    let aprov: any = {
      "endTime": this.i.endTime,
      "startTime": this.i.startTime,
      "name": this.i.name,
      "wno": this.i.wno,
      "disc": this.i.disc,
      "check": false,
      "time": this.i.time,
      "timeout": this.i.timeout,
      "price": this.i.price,
      "resvprice": "",
      "roomno": this.i.roomno,
      "rest": 0,
"key":''

    }
    const splash = document.getElementById('pdf')
    this.wait = true
    let h=splash.innerText
  let str=h.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ');
  let note = "السلام عليكم قمت بطلب إيجار "
  let note2  = "سوف اقوم بإرسال ايصال الدفع الان  "
  this.str = 'https://api.whatsapp.com/send?phone=+96897774689'  + '&text=%20' +note + '%20'+ str +'%20 ,'+note2

   
    
    
    this.afdb.list('new/' + this.i.roomno + "/books").push(aprov).then((data) => {
      this.afdb.list('new/' + this.i.roomno + "/books/"+data.key)
      .set("key", data.key).then(() => {
        
      let message = 'السلام عليكم قمت بطلب إيجار غرفه بأسم ' + this.i.name +' ,,'+"   هذه هيه فاتوره الحجز سوف اقوم بإرسال ايصال الدفع الأن"
            this.whatslink = 'https://wa.me/+96897774689?text=' + message
      

           
            this.Alertserv.ok("تم اضافه الحجز بنجاح ")
        
           
            this.wait = false
            this.showw = true

           

          }).catch((error) => {
            this.wait = false
            this.Alertserv.ok(error)
          })


      
    
    }).catch((error) => {
      this.wait = false
      this.Alertserv.ok(error)
    })




  }
  async createPdf() {
    this.showw=false
    this.Alertserv.t("الرجاء الانتظار سيتم تحميل فاتوره حجزك في لحظات")

    let mssg;
    var node = document.getElementById('pdf');

    let image
    await htmlToImage.toPng(node).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
     

      mssg = img.src;
     



    })

      .catch(function (error) {
       
      });
 
      const options = {
        filename: "فاتوره",
        image: {
          type: 'jpeg'
          //type: 'web'
        },
  
        html2canvas: {
  
          jsPDF: {
            orientation: 'landscape',
            format: 'a5',
            unit: "in",
            height:6.69,
            width:  4.27,
            
          }
        }
  
      };
      const content: Element = document.getElementById('pdf');
   
      html2pdf().from(content).set(options).save();
    
  
 
this.show=true

  }

 
 
  
}

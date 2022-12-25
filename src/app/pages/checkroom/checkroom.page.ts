import { RoomnoPage } from './../roomno/roomno.page';
import { waitForAsync } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthservService } from '../../services/authserv.service';
import { CartService } from '../../services/cart.service'
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
@Component({
  selector: 'app-checkroom',
  templateUrl: './checkroom.page.html',
  styleUrls: ['./checkroom.page.scss'],
})
export class CheckroomPage implements OnInit {
//---------------- varibles -------------------
  eventSource;
  viewTitle;
  viewTitle1;
  sdate: any = ''
  fdate: any = ''
  isToday: boolean;
  avalible: boolean = false
  avalible1: boolean = false

  name: any = ''
  wno: number = null
  pno: number = null
  disc: any = ''
  time:any
  timeout:any
  resvprice:any
  roomno:any
  rest:number
  key:any

  
  public agree: any;
  public i: any = []
  public wait: boolean = false
  public color
  public res: any = []
  public state = ''
  public date = []
  public check: boolean=false
  public showdate: boolean = false
  public price = 0
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    currentDate1: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };

  constructor(private route: ActivatedRoute,
    private afdb: AngularFireDatabase,
    private auth: AuthservService,
    public alertController: AlertController,
    public as: AlertService,
    private afStorage: AngularFireStorage,
    private Alertserv: AlertService,
    public storage: Storage,
    private cartService: CartService,
    private navCtrl: NavController
  ) {

  }
//---------------- ngoninit ---------------------
  ngOnInit() {
    this.route.queryParams.subscribe((resObj) => {
      this.i = resObj;

    });
    this.roomno=this.i.catname
    this.wait = true
    this.afdb.list("new/" + this.i.catname + "/books").valueChanges().subscribe((dbarray) => {

      this.date = dbarray

      var events = [];
    
      this.date.forEach((e, index) => {
      if(e.check){

        events.push({
        
          startTime: new Date(JSON.parse(e.startTime)),
          endTime: new Date(JSON.parse(e.endTime)),
         
          name: e.name,
          wno: e.wno,
          disc: e.disc,
          check: e.check,
          resvprice:e.resvprice,
        key:e.key,
        rest:e.rest,
        price:e.price,
          roomno:e.roomno,
time:e.time,
timeout:e.timeout,

        });
      }
      });


     

      this.eventSource = events

      this.wait = false




    }, (error) => {

      this.Alertserv.ok(error.message)
    });
  }
//------------------ call the number --------------
  callnumber() {
    window.open(`tel:${this.wno}`, '_self');
  }
  
  //----------------- update the resv if aprov or not   ........................................
  what() {

    let hi={
      "check":this.check,
      "rest":this.rest
      }
      this.wait = true
      this.afdb.list('new/' + this.roomno + "/books/")
        .update(this.key, hi).then(() => {
          if(this.check){
            let m =JSON.stringify( moment(JSON.parse(this.i.endTime)).format('M') )
            let y=JSON.stringify( moment(JSON.parse(this.i.endTime)).format('YYYY') )
              let aprov: any = {
                "endTime": this.sdate,
                "startTime": this.fdate,
                "name": this.name,
                "wno": this.wno,
                "disc": this.disc,
                "time": this.time,
                "timeout": this.timeout,
                "price": this.price,
                "resvprice": "",
                "roomno": this.roomno,
                "rest": 0,
          "year":y,
"month":m,
  }
 
  this.wait = true
  
  this.afdb.list('record/' +m + "/").push(aprov).then((data) => {
   
      this.wait = false

                }).catch((error) => {
                  this.wait = false
                  this.Alertserv.ok(error)
                })
              
          }
              this.wait = false
              this.Alertserv.ok('تم تحديث الحاله ')
        }).catch((error) => {
          this.wait = false
          this.as.ok(error.message)
        }) }

//--------------- realted to calender ----------------
  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onEventSelected(event) {

    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  today() {
    return this.calendar.currentDate = new Date();
  }
 

  onTimeSelected1(ev) {
   
    if (ev.events !== undefined && ev.events.length !== 0) {
      this.avalible = true

      this.name = ev.events[0].name,
        this.wno = ev.events[0].wno,
      this.check = ev.events[0].check,
      this.resvprice=ev.events[0].resvprice,
      this.key=ev.events[0].key,
      this.rest=ev.events[0].rest,
      this.price=ev.events[0].price,
      this.roomno=ev.events[0].roomno,
      this.time=ev.events[0].time,
      this.sdate=ev.events[0].startTime ,
this.fdate=ev.events[0].endTime,
this.timeout=ev.events[0].timeout

    }
    else {
     

      this.avalible = false
    }

  }

  createRandomEvents() {
    var events = [];

  
   

    return events;
  }
  
  onViewTitleChanged = (title: string) => {
    this.viewTitle = title;
  };
  onViewTitleChanged1 = (title: string) => {
    this.viewTitle = title;
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
//------------------------- delte the event ----------------------
del(){
 
  this.wait = true
  this.afdb.list('new/' + this.roomno + "/books/")
    .remove(this.key).then(() => {
          this.wait = false
          this.Alertserv.ok('تم  مسح الحدث ')
    }).catch((error) => {
      this.wait = false
      this.as.ok(error.message)
    })
}

}

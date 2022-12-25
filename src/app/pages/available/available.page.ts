import { Component, OnInit, Query } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'
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
import { NgCalendarModule } from 'ionic2-calendar';
import { Storage } from '@ionic/storage';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireModule } from '@angular/fire/compat';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';


@Component({
  selector: 'app-available',
  templateUrl: './available.page.html',
  styleUrls: ['./available.page.scss'],
})
export class AvailablePage implements OnInit {
  //------------------- calender varibles------------------
  eventSource;
  viewTitle;
  viewTitle1;
  seldate: any = ''
  seldate2: any = ''
  isToday: boolean;
  avalible: boolean = false
  avalible1: boolean = false
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
  public date = []
  public start_date: any;
  public end_date: any;
  public i: any = []

  //------------------- personal info varibles------------------
  name: any = ''
  wno: number = null
  disc: any = ''
  time: any = ''
  timeout: any = ''
  public price = 0
  public wait: boolean = false

  checkdate: any[] = []
  istrue: any[] = []
  //------------------------ constructor ---------------------------
  constructor(
    private navController: NavController,
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

  //------------------- ng on init------------------
  ngOnInit() {
    this.route.queryParams.subscribe((resObj) => {
      this.i = resObj;

    });
    this.wait = true
    this.afdb.list("new/" + this.i.catname + "/books").valueChanges().subscribe((dbarray) => {

      this.date = dbarray

      var events = [];
      this.date.forEach(e => {
        if(e.check){
        this.checkdate.push({
          "start": new Date(JSON.parse(e.startTime)),
          "end": new Date(JSON.parse(e.endTime)),
        })
         }

        if (e.check) {
          events.push({
            startTime: new Date(JSON.parse(e.startTime)),
            endTime: new Date(JSON.parse(e.endTime)),
           
          });
        }
      });

      this.eventSource = events
      this.wait = false
    }, (error) => {
      this.wait = false
      this.Alertserv.ok(error.message)
    });
  }

  //------------------- calender funvtions------------------
  today() {
    return this.calendar.currentDate = new Date();
  }
  today1() {
    return this.calendar.currentDate1 = new Date();
  }
  onTimeSelected1(ev) {

    if (ev.events !== undefined && ev.events.length !== 0) {
      this.avalible = true

    }
    else {

      this.start_date = ev.selectedTime
      this.avalible = false
    }

  }
  onTimeSelected2(ev) {

    if (ev.events !== undefined && ev.events.length !== 0) {
      this.avalible1 = true
    }
    else {
      this.end_date = ev.selectedTime

      this.avalible1 = false
    }

  }
  onViewTitleChanged = (title: string) => {
    this.viewTitle = title;
  };
  onViewTitleChanged1 = (title: string) => {
    this.viewTitle1 = title;
  };
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  //------------------- total price------------------
  getprice() {
    return this.cartService.ttlprice(this.end_date, this.start_date, this.i.price)
  }

  //------------------- see if there is a confilect ----------
  getbetweendates(d1, d2) {
    var now = d1.clone(), dates = [];
    while (now.isSameOrBefore(d2)) {
      dates.push(now.format('MM/DD/YYYY'));
      now.add(1, 'days');
    }

    return dates; }

  check() {
    this.istrue = []
    var startDate = moment(this.start_date);
    var endDate = moment(this.end_date);
    var dateList = this.getbetweendates(startDate, endDate);

    this.checkdate.forEach(e => {
      dateList.forEach(h => {
        if (moment(h).isBetween(e.start, e.end)) {
          this.istrue.push(h)
        }
      });
    });
    return this.istrue.length
  }

  //------------------- go to confirm page------------------
  createRandomEvents() {
console.log(this.time)
console.log(this.timeout)
    if (this.avalible) {
      this.Alertserv.ok('الرجاء اختيار تاريخ بدايه متوفر')
    }

    else if (this.avalible1) {
      this.Alertserv.ok('الرجاء اختيار تاريخ نهايه متوفر')
    }
    else if (moment().isAfter(this.start_date) && !(moment(this.start_date).format('DD/MM/YYYY') == moment(this.calendar.currentDate).format('DD/MM/YYYY'))) {
      this.Alertserv.ok('تاريخ بدايه الحجز الذي اخترته فات ')
    }
    else if (moment().isAfter(this.end_date) && !(moment(this.end_date).format('DD/MM/YYYY') == moment(this.calendar.currentDate).format('DD/MM/YYYY'))) {
      this.Alertserv.ok('تاريخ نهايه الحجز الذي اخترته فات')
    }
    else if ((moment().diff(this.end_date) - moment().diff(this.start_date)) > 0) {
      this.Alertserv.ok('لا يمكن ان يسبق موعد بدايه الحجز موعد النهايه ')
    }
    else if ((this.check() > 0)) {
      this.Alertserv.ok(' الموعد الذي اخترته يتعارض مع الحجوزات السابق ')
    }

    else if (this.time == '') {
      this.Alertserv.ok('(الرجاء الغاء الترحمه الى العربي اذا لا زلت تواجه نفس المشكله) ادخل وقت بدايه الحجز')
     
    }
    else if (this.timeout == '') {
      this.Alertserv.ok('(الرجاء الغاء الترحمه الى العربي اذا لا زلت تواجه نفس المشكله)ادخل وقت نهايه الحجز')
    }
    else if (this.name == '') {
      this.Alertserv.ok('ادخل اسمك')
    }
    else if (this.wno == null) {
      this.Alertserv.ok(' ادخل رقم الواتساب')
    }


    else {
      var sdate = moment(this.start_date).format('DD/MM/YYYY') + ' ' + moment(this.time).format(' h:mm:ss a');
      var edate = moment(this.end_date).format('DD/MM/YYYY') + ' ' + moment(this.time).format(' h:mm:ss a');
    

      var start =moment(sdate ,"DD/MM/YYYY, h:mm:ss a")
      var end = moment(edate ,"DD/MM/YYYY, h:mm:ss a")


      console.log(start)
      console.log(end)


      
     let hi = {
        "startTime": JSON.stringify(start),
        "endTime":  JSON.stringify(end),
        "allDay": true,
        "name": this.name,
        "wno": this.wno,
        "disc": this.disc,
        "check": false,
        "time": this.time,
        "timeout": this.timeout,
        "price": this.getprice(),
        "resvprice": "",
        "roomno": this.i.catname,
        "rest": 0,
      }

      let navExtras: NavigationExtras = {
        queryParams: hi
      }
      this.navCtrl.navigateForward('confirmorder', navExtras);
      
    }


  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IonSlides } from '@ionic/angular';
import { AlertService } from '../../services/alert.service'

import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-roomno',
  templateUrl: './roomno.page.html',
  styleUrls: ['./roomno.page.scss'],
})
export class RoomnoPage implements OnInit {
  public wait: boolean = false;
  public catname:any;
public catarray:any=[];
public price :number;
imagelink:string=""
  constructor( public alertController: AlertController,
    private afStorage: AngularFireStorage,
    private Alertserv: AlertService,
    public storage: Storage,
    private afdb: AngularFireDatabase,
    private imageCompress: NgxImageCompressService,) { }

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
async addcat(){
  if(this.catname==''){
    this.Alertserv.ok("الرجاء ادخل رقم الغرفه")
  }
else if (this.price==null){
  this.Alertserv.ok("الرجاء ادخل سعر الغر فه")
}
else if (this.blob==''){
  this.Alertserv.ok("اضف صوره")
}
else{
  this.wait = true
  await this.afStorage.ref('/gallery').child(this.catname).put(this.blob).then((success) => {
    return this.afStorage.ref(`gallery/${this.catname}`).getDownloadURL().subscribe((url) => {

      let link = "url(" + url + ")"

      this.imagelink=url;
     
  let catarray=
    {
"catname":this.catname,
"catid":"",
"price":this.price,
"bx":false,
"delete":false,
"books":'',
"imageurl":this.imagelink
    }
    
   
  this.afdb.list("new").set(this.catname ,catarray).then((data)=>{

      this.wait = false
      this.catname=""
    this.price=null

    }).catch((error)=>{
      this.wait = false
      this.Alertserv.ok(error)
    })
  }, (error) => {
    this.wait = false
    this.Alertserv.ok(error)
  });
}).catch((error) => {
  this.wait = false
  this.Alertserv.ok(error)
})

  }

}
sure(i){
  i.delete=true
}
hide(i){
  i.delete=false
}
delcat(catid){


  this.wait = true
  this.afdb.list("new").remove(catid)
  .then(() => {
    this.wait = false
    
  })
  .catch((error) => {
    this.wait = false
    this.Alertserv.ok(error.message);
  })

}

file: any;
  localUrl: any;
  localCompressedURl:any;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;

  
  selectFile(event: any) {
  var  fileName : any;
  this.file = event.target.files[0];
  fileName = this.file['name'];
  if (event.target.files && event.target.files[0]) {
  var reader = new FileReader();
  reader.onload = (event: any) => {
  this.localUrl = event.target.result;
  this.compressFile(this.localUrl,fileName)
  }
  reader.readAsDataURL(event.target.files[0]);
  }
  }
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  compressFile(image,fileName) {
  var orientation = -1;
  this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1000*1000);
  console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
  this.imageCompress.compressFile(image, orientation, 50, 50).then(
  result => {
  this.imgResultAfterCompress = result;
  this.localCompressedURl = result;
  this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1000*1000)
  console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
  // create file from byte
  const imageName = fileName;
  // call method that creates a blob from dataUri
  const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
  //imageFile created below is the new compressed file which can be send to API in form data
  const imageFile = new File([result], imageName, { type: 'image/jpeg' });

  });

}
blob:any=''
  dataURItoBlob(dataURI) {
   
  
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
    }
    for (let i = 0; i < byteString.length; i += 1) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    this.blob=blob
    console.log(blob)
    return blob;
   
  
  }
}





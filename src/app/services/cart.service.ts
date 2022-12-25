import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
 ///////v ar for offer////

  constructor(private afdb: AngularFireDatabase,) { }
  
 
  ttlprice(s,f,p){
    let ttl=0
    var a = moment(s);
var b = moment(f);
a.diff(b, 'days')   // =1

   ttl=Math.abs(a.diff(b, 'days') ) * Number(p)
  
  if(a.diff(b, 'days')==0){
    return p
  }

  else{
    return ttl  
  }
  }
public arr:any=[]
  checkdate(arr,s,f){

    
    this.arr=arr
this.arr.forEach(e => {
  console.log(e)
  moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
moment().isBetween
});
  }

}

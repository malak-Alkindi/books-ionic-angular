import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthservService } from '../services/authserv.service';
import { NavController } from '@ionic/angular';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthservService,
    private navCtrl: NavController,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      let currentuser = this.authService.isLoggedIn;
      if (currentuser) {
        return true;//returntrue mean user is logedin so 
        
      }
      this.navCtrl.navigateRoot('addroom');
      return false;//else its false and redirect to welcome page
    }

  
}
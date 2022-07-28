import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }
  
  canActivate(): boolean {


    console.dir(this.authService.userState);
    
    // if(this.authService.isLoggedIn) {
    if(this.authService.userState){  
        return true;
      } else {
        return false;
      }
  }
}

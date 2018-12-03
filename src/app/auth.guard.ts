import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import Utils from './scripts/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    var user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    if (user) {
        if (Utils.getTime() - Number(user.time) <= 1000 * 60 * 60) {
            this.auth.setLoggedIn(true);
        } else {
            this.auth.logout();
        }
    }
    
    if (!this.auth.isLoggedIn)
        this.router.navigate(['/login']);

    return this.auth.isLoggedIn;
  }
}
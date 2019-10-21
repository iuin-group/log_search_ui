import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}

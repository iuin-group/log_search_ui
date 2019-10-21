import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {

    isLoggedIn: boolean;

    private _token = '';

    constructor(private router: Router) {
        this._token = sessionStorage.getItem('token');
        this.isLoggedIn = !!this._token;
    }

    login(credentials) {
        sessionStorage.setItem('token', 'token-value');
        this.isLoggedIn = true;
        this.router.navigate(['/']);
    }

    logout() {
        this._token = '';
        sessionStorage.clear();
        this.isLoggedIn = false;
    }
}

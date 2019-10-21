import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;

    loginForm: FormGroup;

    constructor(private authService: AuthService,
        private router: Router, private fb: FormBuilder) { }

    ngOnInit() {
        const username = localStorage.getItem('username') || 'admin';
        const password = localStorage.getItem('password') || 'password';
        const rememberMe = !!localStorage.getItem('rememberMe');
        this.loginForm = this.fb.group({
            type: ['avamar', [Validators.required]],
            domain: ['/'],
            grant_type: ['password'],
            scope: ['all'],
            username: [username, [Validators.required]],
            password: [password, [Validators.required]],
            rememberMe: [rememberMe]
        });
    }

    login() {
        if (this.loginForm.get('rememberMe').value) {
            localStorage.setItem('username', this.loginForm.get('username').value);
            localStorage.setItem('password', this.loginForm.get('password').value);
            localStorage.setItem('rememberMe', this.loginForm.get('rememberMe').value);
        } else {
            localStorage.clear();
        }
        this.loading = true;
        this.authService.login(this.loginForm.value);
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    collapsed = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}

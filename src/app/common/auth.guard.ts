import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate() {
        if (this.authService.isAuthenticated) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
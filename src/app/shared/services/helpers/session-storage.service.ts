import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '@core/config';
import { IUsers } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    user!: IUsers;
    constructor(
        private readonly router: Router,
    ) { }

    setUser(data: any) {
        this.user = data;
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('role', this.user?.role);
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem('user') || '{}');
    }

    getRole() {
        return sessionStorage.getItem('role');
    }

    setRole(role: any) {
        sessionStorage.setItem('role', role);
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate([AppConfig.routes.auth.login]);
    }
}

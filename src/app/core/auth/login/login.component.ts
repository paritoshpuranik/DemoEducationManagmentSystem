import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AppConfig } from '@core/config';
import { IApiResponseObj, IUsers, Regex, SessionStorageService, UsersService } from '@shared/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Base implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    usersList!: IUsers[];
    showErrorMessage = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly usersService: UsersService,
        private readonly sessionStorageService: SessionStorageService
    ) { 
        super();
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName:  new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
        this.getAllUsers();
    }

    get f(): {[key: string]: AbstractControl} {
        return this.loginForm.controls;
    }

    getAllUsers() {
        this.usersService.getAllUser()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (user: IApiResponseObj) => {
                this.usersList = user.response;
            }
        })
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const result = this.usersList.find( ({ userName }) => userName === this.loginForm.value.userName );
        if(result) {
            this.sessionStorageService.setUser(result);
            this.router.navigate([AppConfig.routes.modules.dashboard]);
        } else {
            this.showErrorMessage = true;
        }
    }

    goToRegister() {
        this.router.navigate([AppConfig.routes.auth.registration]);
    }

}

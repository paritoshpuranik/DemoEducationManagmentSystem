import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '@core/config';
import { Base } from '@core/base';
import { Regex, SessionStorageService, TypeOfRole } from '@shared/index';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends Base implements OnInit {
    registerForm!: FormGroup;
    submitted = false;
    role!: string | null;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly sessionStorageService: SessionStorageService
    ) { 
        super();
    }


    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        this.registerForm = this.fb.group({
            name:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexAlphabets)]),
            userName:  new FormControl('', [Validators.required]),
            contactNumber:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexMobileNumber)]),
            department:  new FormControl(''),
            email:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexHiddenEmail)]),
            password: new FormControl('')
        });
        if(this.role === TypeOfRole.hod) {
            this.registerForm.controls['department'].setValidators([Validators.required]);
            this.registerForm.controls['password'].setValidators([Validators.required]);
        }
    }

    get f(): {[key: string]: AbstractControl} {
        return this.registerForm.controls;
    }

    // Helper to hide some elements of email id and validate.
    validateEmail(event: any) {
        const inputValue = event.target.value;
        let email: string = ''
        let hide = inputValue.split("@")[0].length - 1;//<-- number of characters to hide
        const r = new RegExp(".{"+hide+"}@", "g")
        email = inputValue.replace(r, "***@" );
        this.registerForm.get('email')?.setValue(email);
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        this.router.navigate([AppConfig.routes.modules.dashboard]);
    }

}

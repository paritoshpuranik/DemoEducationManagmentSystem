import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '@core/config';
import { Base } from '@core/base';
import { IUsers, Regex, SessionStorageService, TypeOfRole, StaffManagementService, UsersService } from '@shared/index';
import { mergeMap, pipe, takeUntil } from 'rxjs';
import { IListOfStaff } from '@shared/models/staff-management.model';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends Base implements OnInit {
    registerForm!: FormGroup;
    submitted = false;
    role!: string | null;
    listOfStaff!: IListOfStaff[];

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly sessionStorageService: SessionStorageService,
        private readonly staffManagementService: StaffManagementService,
        private readonly usersService: UsersService,
    ) { 
        super();
    }


    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name:  new FormControl('', [Validators.required]),
            userName:  new FormControl('', [Validators.required]),
            contactNumber:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexMobileNumber)]),
            department:  new FormControl(''),
            email:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexHiddenEmail)]),
            password: new FormControl('')
        });
        if(this.role === TypeOfRole.hod) {
            this.registerForm.controls['department'].setValidators([Validators.required]);
            this.registerForm.controls['password'].setValidators([Validators.required, Validators.pattern(Regex.regexPassword)]);
        }
        this.getStaffDetails();
    }

    get f(): {[key: string]: AbstractControl} {
        return this.registerForm.controls;
    }

    getStaffDetails() {
        this.staffManagementService.getStaffDetails()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (staff: IListOfStaff[]) => {
                this.listOfStaff = staff;
            }
        })
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
        let lastElement = this.listOfStaff[this.listOfStaff.length - 1];
        let data = {
            id: lastElement.id + 1,
            fullName: this.registerForm.value.name,
            userName: this.registerForm.value.userName,
            mobile: this.registerForm.value.contactNumber
        }
        this.staffManagementService.createStaff(data)
        .pipe(takeUntil(this.destroy$))
        .pipe(
            mergeMap((res) => {
                return  this.usersService.createUser(this.registerForm.value);
            })
            
        ).subscribe({
            next: (user: IUsers[]) => {
                alert('login successful ');
                this.sessionStorageService.setRole(this.registerForm.value?.department)
                this.router.navigate([AppConfig.routes.modules.dashboard]);
            }
        })
    }

    // saveInUser() {
    //     this.usersService.createUser(this.registerForm.value)
    //     .pipe(takeUntil(this.destroy$)).subscribe({
    //         next: (user: IUsers[]) => {
    //         }
    //     })
    // }

}

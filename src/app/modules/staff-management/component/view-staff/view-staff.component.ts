import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISendDataObj, Regex, TypeOfContent } from '@shared/index';
import { IListOfStaff } from '@shared/models/staff-management.model';

@Component({
    selector: 'app-view-staff',
    templateUrl: './view-staff.component.html',
    styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {
    @Input() public singleApplication!: ISendDataObj<IListOfStaff>;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    staffForm!: FormGroup;
    submitted = false;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.staffForm = this.fb.group({
            id: new FormControl(null),
            name:  new FormControl('', [Validators.required]),
            userName:  new FormControl('', [Validators.required]),
            contactNumber:  new FormControl('', [Validators.required, Validators.pattern(Regex.regexMobileNumber)]),
            password: new FormControl('', [Validators.required, Validators.pattern(Regex.regexPassword)])
        });
        if(this.singleApplication?.type !== TypeOfContent.add) {
            this.staffForm.patchValue(this.singleApplication?.items);
            this.staffForm.disable();
        }
    }

    get f(): {[key: string]: AbstractControl} {
        return this.staffForm.controls;
    }

    close() {
        this.activeModal.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.staffForm.invalid) {
            return;
        }
        const data = {
            type: this.singleApplication?.type,
            items: this.staffForm?.value
        }
        this.passEntry.emit(data );
        this.close();
    }

}

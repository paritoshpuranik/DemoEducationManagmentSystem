import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IDateObj, IListOfLeaves, ISendDataObj, SessionStorageService, TypeOfContent } from '@shared/index';

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.scss']
})
export class ViewLeavesComponent implements OnInit {
    @Input() public singleApplication!: ISendDataObj<IListOfLeaves>;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    model!: NgbDateStruct;
    leavesForm!: FormGroup;
    submitted = false;
    minDate!: IDateObj;
    maxDate!: IDateObj;
    role!: string | null;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly fb: FormBuilder,
        private readonly sessionStorageService: SessionStorageService
    ) { }

    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        this.leavesForm = this.fb.group({
            id: new FormControl(null),
            fromDate:  new FormControl('', [Validators.required,]),
            toDate: new FormControl('', [Validators.required,]),
            reason: new FormControl('', [Validators.required,]),
            status: new FormControl(''),
        });
        if(this.singleApplication?.type !== TypeOfContent.add) {
            this.leavesForm.patchValue(this.singleApplication?.items)
            this.modifyDate();
            this.leavesForm.disable();
        }
    }

    get f(): {[key: string]: AbstractControl} {
        return this.leavesForm.controls;
    }

    // helper to modify the from date and to date coming from the @input.
    modifyDate() {
        const fromDateParts = this.singleApplication?.items?.fromDate.trim().split('-');
        const dateParts = this.singleApplication?.items?.toDate.trim().split('-');
        const formDate = {
            year: parseInt(fromDateParts[2]),
            month: parseInt(fromDateParts[0]),
            day: parseInt(fromDateParts[1]),
        }
        const toDate = {
            year: parseInt(dateParts[2]),
            month: parseInt(dateParts[0]),
            day: parseInt(dateParts[1]),
        }
        this.leavesForm.controls['fromDate'].setValue(formDate);
        this.leavesForm.controls['toDate'].setValue(toDate);
    }

    close() {
        this.activeModal.close();
    }

    // helper to set validation for dates minDate and maxDate
    onSelect(selected: IDateObj ) {
        this.minDate = {
            year: selected.year,
            month: selected.month,
            day: selected.day,
        };
        this.maxDate = {
            year: selected.year,
            month: selected.month,
            day: selected.day + 5,
        };
    }

    onSubmit() {
        this.submitted = true;
        if (this.leavesForm.invalid) {
            return;
        }
        const formDate = this.leavesForm.get("fromDate")?.value?.month + '-' + this.leavesForm.get("fromDate")?.value?.day + '-' +this.leavesForm.get("fromDate")?.value?.year;
        const toDate = this.leavesForm.get("toDate")?.value?.month + '-' + this.leavesForm.get("toDate")?.value?.day + '-' +this.leavesForm.get("toDate")?.value?.year;
        this.leavesForm.controls['fromDate'].setValue(formDate);
        this.leavesForm.controls['toDate'].setValue(toDate);
        const data = {
            type: this.singleApplication?.type,
            items: this.leavesForm?.value
        }
        this.passEntry.emit(data);
        this. close();
    }

}

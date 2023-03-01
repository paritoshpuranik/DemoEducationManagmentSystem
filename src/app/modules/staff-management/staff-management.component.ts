import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUserListTableEnum, IApiResponseObj, StaffManagementService } from '@shared/index';
import { IListOfStaff } from '@shared/models/staff-management.model';
import { takeUntil } from 'rxjs';
import { ViewStaffComponent } from './component/view-staff/view-staff.component';

@Component({
    selector: 'app-staff-management',
    templateUrl: './staff-management.component.html',
    styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent extends Base implements OnInit {
    page = GetUserListTableEnum.pageNumber;
	pageSize = GetUserListTableEnum.pageSize;
    collectionSize!: number;
    listOfStaff!: IListOfStaff[];
    staffList!: IListOfStaff[];
    

    constructor(
        private readonly staffManagementService: StaffManagementService,
        private readonly modalService: NgbModal,
    ) { 
        super();
    }

    ngOnInit(): void {
        this.getStaffDetails();
    }

    getStaffDetails() {
        this.staffManagementService.getStaffDetails()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (staff: IApiResponseObj) => {
                this.listOfStaff = staff?.response;
                this.staffList = staff?.response;
                this.collectionSize = this.listOfStaff.length;
                this.refreshItems();
            }
        })
    }

    // set page size, page number.
    refreshItems() {
		this.staffList = this.listOfStaff.map((item) => ({ ...item })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

     // This will open the view/add modal on click.
     applyForLeaves(type: string, items?: IListOfStaff) {
        const modalRef = this.modalService.open(ViewStaffComponent,{centered: true});
        let data = {
            type: type,
            items: items
        }
        modalRef.componentInstance.singleApplication = data;
        // This will handle the request once modal is closed.
        modalRef.componentInstance.passEntry
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (item: IListOfStaff) => {
            }
        })
    }

    // Delete staff by Id
    removeStaff(items: IListOfStaff) {
        if(confirm(`"Are you sure to delete " ${items?.fullName}`)) {
            this.staffList = this.listOfStaff.filter(item => item.id !== items?.id)
        }
    }

}

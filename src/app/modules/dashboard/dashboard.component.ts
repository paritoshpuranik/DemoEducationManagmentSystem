import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';
import { IApiResponseObj, IListOfLeaves, LeaveManagementService, SessionStorageService, StaffManagementService } from '@shared/index';
import { IListOfStaff } from '@shared/models/staff-management.model';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Base implements OnInit {
    listOfLeaves!: IListOfLeaves[];
    totalCountOfLeaves!: number;
    approvedCount!: number;
    rejectedCount!: number;
    pendingCount!: number;
    role!: string | null;
    validatedCount!: IListOfStaff[];
    listOfStaff!: IListOfStaff[];

    constructor(
        private readonly leaveManagementService: LeaveManagementService,
        private readonly sessionStorageService: SessionStorageService,
        private readonly staffManagementService: StaffManagementService,
    ) {
        super();
     }

    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        if(this.role === 'Hod') {
            this.getStaffDetails();
        }
        else {
            this.getLeavesOfStaff();
        }
        
    }

    getLeavesOfStaff() {
        let filterArray: IListOfLeaves[] = [];
        this.leaveManagementService.getLeavesOfStaff() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IListOfLeaves[]) => {
                const filterData = menu.filter((a:IListOfLeaves) => {
                    if(a?.userId === this.sessionStorageService.getUser()?.id) {
                        filterArray.push(a)
                    }
                })
                this.listOfLeaves = filterArray;
                this.totalCountOfLeaves = this.listOfLeaves?.length;
                this.totalLeaveApprovedAndRejected();
            }
        })
    }

    getStaffDetails() {
        let filterArray: IListOfStaff[] = [];
        this.staffManagementService.getStaffDetails()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (staff: IListOfStaff[]) => {
                this.validatedCount = staff;
                const filterData = staff.filter((a:IListOfStaff) => {
                    if(a?.userId === this.sessionStorageService.getUser()?.id) {
                        filterArray.push(a)
                    }
                })
                this.listOfStaff = filterArray;
                this.totalCountOfLeaves = this.listOfStaff?.length;
            }
        })
    }

    totalLeaveApprovedAndRejected() {
        let arrayOfApproved: IListOfLeaves[] = [];
        let arrayOfReject: IListOfLeaves[] = [];
        let arrayOfPending: IListOfLeaves[] = [];
        this.listOfLeaves.filter((item) => {
            if(item.status === 'Approved') {
                arrayOfApproved.push(item);
            } else {
                if(item.status === 'Rejected') {
                    arrayOfReject.push(item);
                } else {
                    arrayOfPending.push(item);
                }
            }
        })
        this.approvedCount = arrayOfApproved.length;
        this.rejectedCount = arrayOfReject.length;
        this.pendingCount = arrayOfPending.length;
    }

}

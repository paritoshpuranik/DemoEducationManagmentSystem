import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';
import { IApiResponseObj, IListOfLeaves, LeaveManagementService, SessionStorageService } from '@shared/index';
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
    role!: string | null;

    constructor(
        private readonly leaveManagementService: LeaveManagementService,
        private readonly sessionStorageService: SessionStorageService
    ) {
        super();
     }

    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        this.getLeavesOfStaff();
    }

    getLeavesOfStaff() {
        this.leaveManagementService.getLeavesOfStaff() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IListOfLeaves[]) => {
                this.listOfLeaves = menu;
                this.totalCountOfLeaves = this.listOfLeaves?.length;
                this.totalLeaveApprovedAndRejected();
            }
        })
    }

    totalLeaveApprovedAndRejected() {
        let arrayOfApproved: IListOfLeaves[] = [];
        let arrayOfReject: IListOfLeaves[] = [];
        this.listOfLeaves.filter((item) => {
            if(item.status === 'Approved') {
                arrayOfApproved.push(item);
            } else {
                arrayOfReject.push(item);
            }
        })
        this.approvedCount = arrayOfApproved.length;
        this.rejectedCount = arrayOfReject.length;
    }

}

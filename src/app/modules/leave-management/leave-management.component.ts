import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUserListTableEnum, IApiResponseObj, IListOfLeaves, LeaveManagementService, SessionStorageService, TypeOfRole } from '@shared/index';
import { takeUntil } from 'rxjs';
import { ViewLeavesComponent } from './component/view-leaves/view-leaves.component';

@Component({
    selector: 'app-leave-management',
    templateUrl: './leave-management.component.html',
    styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent extends Base implements OnInit {
    page = GetUserListTableEnum.pageNumber;
	pageSize = GetUserListTableEnum.pageSize;
    collectionSize!: number;
    listOfLeaves!: IListOfLeaves[];
    listOfLeavesStaff!: IListOfLeaves[];
    role!: string | null;

    constructor(
        private readonly leaveManagementService: LeaveManagementService,
        private readonly modalService: NgbModal,
        private readonly sessionStorageService: SessionStorageService
    ) {
        super();
     }

    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        if(this.role !== TypeOfRole.hod) {
            this.getLeavesOfStaff();
        } else {
            this.getListOfLeavesApproval();
        }
    }

    // This will load the list of leaves (role: staff).
    getLeavesOfStaff() {
        this.leaveManagementService.getLeavesOfStaff() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IApiResponseObj) => {
                this.listOfLeaves = menu.response;
                this.listOfLeavesStaff = menu.response;
                this.collectionSize = this.listOfLeaves.length;
                this.refreshItems();
            }
        })
    }

    getListOfLeavesApproval() {
        this.leaveManagementService.getListOfLeavesApproval() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IApiResponseObj) => {
                this.listOfLeaves = menu.response;
                this.listOfLeavesStaff = menu.response;
                this.collectionSize = this.listOfLeaves.length;
                this.refreshItems();
            }
        })
    }

    // set page size, page number.
    refreshItems() {
		this.listOfLeavesStaff = this.listOfLeaves.map((item) => ({ ...item })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

    // This will open the view/add modal on click.
    applyForLeaves(type: string, items?: IListOfLeaves) {
        const modalRef = this.modalService.open(ViewLeavesComponent,{centered: true});
        let data = {
            type: type,
            items: items
        }
        modalRef.componentInstance.singleApplication = data;
        // This will handle the request once modal is closed.
        modalRef.componentInstance.passEntry
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (item: IListOfLeaves) => {
            }
        })
    }
}

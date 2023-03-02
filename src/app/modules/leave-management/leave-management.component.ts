import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUserListTableEnum, IApiResponseObj, IListOfLeaves, ISendDataObj, LeaveManagementService, SessionStorageService, TypeOfContent, TypeOfRole } from '@shared/index';
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
    validatedCount!: IListOfLeaves[];

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
        let filterArray: IListOfLeaves[] = [];
        this.leaveManagementService.getLeavesOfStaff() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IListOfLeaves[]) => {
                this.validatedCount = menu;
                const filterData = menu.filter((a:IListOfLeaves) => {
                    if(a?.userId === this.sessionStorageService.getUser()?.id) {
                        filterArray.push(a)
                    }
                })
                this.listOfLeaves = filterArray;
                this.listOfLeavesStaff = filterArray;
                this.collectionSize = this.listOfLeavesStaff.length;
                this.refreshItems();
            }
        })
    }

    getListOfLeavesApproval() {
        let filterArray: IListOfLeaves[] = [];
        this.leaveManagementService.getListOfLeavesApproval() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IListOfLeaves[]) => {
                this.validatedCount = menu;
                const filterData = menu.filter((a:IListOfLeaves) => {
                    if(a?.userId === this.sessionStorageService.getUser()?.id) {
                        filterArray.push(a)
                    }
                })
                this.listOfLeaves = filterArray;
                this.listOfLeavesStaff = filterArray;
                this.collectionSize = this.listOfLeavesStaff.length;
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
            next: (item: ISendDataObj) => {
                if(item.type === TypeOfContent.add) {
                    let lastElement = this.validatedCount[this.validatedCount.length - 1];
                    let data = {
                        id: lastElement.id + 1,
                        fromDate: item?.items?.fromDate,
                        toDate: item?.items?.toDate,
                        reason: item?.items.reason,
                        status: item?.items?.status,
                        userId: this.sessionStorageService.getUser().id
                    }
                    this.leaveManagementService.applyForLeaves(data)
                    .pipe(takeUntil(this.destroy$)).subscribe({
                        next: (res: any) => {
                            if( this.role === TypeOfRole.hod) {
                                this.getListOfLeavesApproval();
                            } else {
                                this.getLeavesOfStaff();
                            }
                        }
                    })
                } else {
                    let data = {
                        id: item?.items?.id,
                        fromDate: item?.items?.fromDate,
                        toDate: item?.items?.toDate,
                        reason: item?.items.reason,
                        status: item?.items?.status,
                        userId: this.sessionStorageService.getUser().id
                    }
                    this.leaveManagementService.updateStatusOfLeaves(data)
                    .pipe(takeUntil(this.destroy$)).subscribe({
                        next: (res: any) => {
                            if( this.role === TypeOfRole.hod) {
                                this.getListOfLeavesApproval();
                            } else {
                                this.getLeavesOfStaff();
                            }
                        }
                    })
                }
            }
        })
    }
}

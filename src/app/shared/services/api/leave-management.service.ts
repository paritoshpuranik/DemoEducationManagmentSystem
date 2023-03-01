import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { HttpService, IApiResponseObj } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeaveManagementService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getLeavesOfStaff(): Observable<IApiResponseObj> {
        return this.httpService.get(AppConfig.endPoints.leavesManagement.getLeavesOfStaff);
    }

    getListOfLeavesApproval(): Observable<IApiResponseObj> {
        return this.httpService.get(AppConfig.endPoints.leavesManagement.getLeavesOfStaffForApproval);
    }
}

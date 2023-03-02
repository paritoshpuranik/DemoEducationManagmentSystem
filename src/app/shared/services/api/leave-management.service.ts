import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { HttpService, IApiResponseObj, IListOfLeaves } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeaveManagementService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getLeavesOfStaff(): Observable<IListOfLeaves[]> {
        return this.httpService.get(AppConfig.endPoints.leavesManagement.getLeavesOfStaff);
    }

    getListOfLeavesApproval(): Observable<IListOfLeaves[]> {
        return this.httpService.get(AppConfig.endPoints.leavesManagement.getLeavesOfStaffForApproval);
    }

    applyForLeaves (data: IListOfLeaves): Observable<IListOfLeaves[]> {
        return this.httpService.post(AppConfig.endPoints.leavesManagement.applyForLeaves, data);
    }

    updateStatusOfLeaves(data: IListOfLeaves): Observable<IListOfLeaves[]> {
        return this.httpService.put(AppConfig.endPoints.leavesManagement.updateStatusOfLeaves +'/'+ data.id, data);
    }
}

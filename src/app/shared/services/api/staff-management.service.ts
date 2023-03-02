import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { HttpService, IApiResponseObj } from '@shared/index';
import { IListOfStaff } from '@shared/models/staff-management.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StaffManagementService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getStaffDetails(): Observable<IListOfStaff[]> {
        return this.httpService.get(AppConfig.endPoints.staffManagement.getStaffDetails);
    }

    createStaff(createStaff: IListOfStaff): Observable<[]> {
        return this.httpService.post(AppConfig.endPoints.staffManagement.createStaff, createStaff);
    }

    updateStaff(updateStaff: IListOfStaff): Observable<[]> {
        return this.httpService.put(AppConfig.endPoints.staffManagement.deleteStaff + '/' + updateStaff.id, updateStaff);
    }

    deleteStaff(id: number): Observable<[]> {
        return this.httpService.delete(AppConfig.endPoints.staffManagement.deleteStaff + '/' + id, {});
    }
}

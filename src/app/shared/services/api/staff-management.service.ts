import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { HttpService, IApiResponseObj } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StaffManagementService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getStaffDetails(): Observable<IApiResponseObj> {
        return this.httpService.get(AppConfig.endPoints.staffManagement.getStaffDetails);
    }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { IApiResponseObj } from '@shared/index';
import { Observable } from 'rxjs';
import { HttpService } from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getAllUser(): Observable<IApiResponseObj> {
        return this.httpService.get(AppConfig.endPoints.users.getAllUser);
    }
}

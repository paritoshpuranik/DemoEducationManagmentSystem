import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { IUsers } from '@shared/index';
import { Observable } from 'rxjs';
import { HttpService } from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getAllUser(): Observable<IUsers[]> {
        return this.httpService.get(AppConfig.endPoints.users.getAllUser);
    }

    createUser(userData: IUsers): Observable<IUsers[]> {
        return this.httpService.post(AppConfig.endPoints.users.createUser, userData);
    }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '@core/config';
import { HttpService, IUsers } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    login(userData: IUsers): Observable<IUsers> {
        return this.httpService.post(AppConfig.endPoints.auth.login, userData);
    }
}

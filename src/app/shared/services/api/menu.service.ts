import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { IApiResponseObj, ISideNavbarMenu } from '@shared/index';
import { Observable } from 'rxjs';
import { HttpService } from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getMenus(): Observable<ISideNavbarMenu[]> {
        return this.httpService.get(AppConfig.endPoints.menu.getMenus);
    }
}

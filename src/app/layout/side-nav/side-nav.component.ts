import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '@core/index';
import { IApiResponseObj, ISideNavbarMenu, MenuService, MenuType, SessionStorageService, TypeOfRole } from '@shared/index';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent extends Base implements OnInit {
    menuList!: ISideNavbarMenu[];
    role!: string | null;
    constructor(
        private readonly menuService: MenuService,
        private readonly router: Router,
        private readonly sessionStorageService: SessionStorageService
    ) { 
        super();
    }

    ngOnInit(): void {
        this.role = this.sessionStorageService.getRole();
        this.getListOfMenu();
    }

    getListOfMenu() {
        this.menuService.getMenus() 
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (menu: IApiResponseObj) => {
                this.menuList = menu.response;
                if(this.role === TypeOfRole.staff) {
                    this.menuList = this.menuList.filter(item => item.name !== MenuType.staffManagement)
                }
            }
        })
    }

    onNavigate(items: ISideNavbarMenu) {
        this.router.navigate([items?.routerLink]);
    }

    logout() {
        this.sessionStorageService.logout();
    }

}

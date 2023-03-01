import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from '@core/index';
import { HeaderComponent } from './header';

const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: AppConfig.routes.modules.dashboard,
                loadChildren: () =>
                  import('@modules/index').then(m => m.DashboardModule),
            },
            {
                path: AppConfig.routes.modules.leaveManagement,
                loadChildren: () =>
                  import('@modules/index').then(m => m.LeaveManagementModule),
            },
            {
                path: AppConfig.routes.modules.staffManagement,
                loadChildren: () =>
                  import('@modules/index').then(m => m.StaffManagementModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }

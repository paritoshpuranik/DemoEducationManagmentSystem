import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffManagementComponent } from './staff-management.component';

const routes: Routes = [
    {
        path: '',
        component: StaffManagementComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManagementRoutingModule { }

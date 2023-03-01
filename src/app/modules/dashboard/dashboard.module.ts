import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }

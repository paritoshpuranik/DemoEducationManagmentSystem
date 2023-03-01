import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { LeaveManagementRoutingModule } from './leave-management-routing.module';
import { ViewLeavesComponent } from './component/view-leaves/view-leaves.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from 'angular-onscreen-material-keyboard';

const customLayouts: IKeyboardLayouts = {
  ...keyboardLayouts,
    'Tölles Läyout': {
        'name': 'Awesome layout',
        'keys': [
            [
            ['1', '!'],
            ['2', '@'],
            ['3', '#']
            ]
        ],
        'lang': ['de-CH']
    }
};

@NgModule({
    declarations: [
        ViewLeavesComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        NgbPaginationModule,
        NgbDatepickerModule,
        NgbAlertModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        LeaveManagementRoutingModule,
        MatButtonModule,
        MatKeyboardModule,
    ],
    providers: [
        { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
    ],
})
export class LeaveManagementModule { }

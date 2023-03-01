import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { ViewStaffComponent } from './component/view-staff/view-staff.component';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
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
        ViewStaffComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        StaffManagementRoutingModule,
        MatButtonModule,
        MatKeyboardModule,
    ],
    providers: [
        { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
    ],
})
export class StaffManagementModule { }

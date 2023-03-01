import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent, RegistrationComponent } from '@core/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffManagementComponent } from './modules/staff-management/staff-management.component';
import { LeaveManagementComponent } from './modules/leave-management/leave-management.component';
import { HttpConfigInterceptor } from '@core/interceptor/http-config.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';

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
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
        StaffManagementComponent,
        LeaveManagementComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatKeyboardModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        },
        { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule { }

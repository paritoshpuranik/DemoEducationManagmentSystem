import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegistrationComponent } from '@core/auth';
import { AppConfig } from '@core/config/app.config';

const routes: Routes = [
    { path: '', redirectTo: AppConfig.routes.auth.login, pathMatch: 'full' },
    {
        path: AppConfig.routes.auth.login,
        component: LoginComponent,
    },
    {
        path: AppConfig.routes.auth.registration,
        component: RegistrationComponent,
    },
    {
        path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/loginregister/loginregister.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { authGuard } from './guards/auth.guard';
import { FeesComponent } from './pages/fees/fees.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { notAuthGuard } from './guards/not-auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginRegisterComponent,
        canActivate: [notAuthGuard]
    },
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [authGuard],
                component: DashboardComponent
            },
            {
                path: 'fees',
                canActivate: [authGuard],
                component: FeesComponent
            },
            {
                path: 'reports',
                canActivate: [authGuard],
                component: ReportsComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

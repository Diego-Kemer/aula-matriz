import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';

export const routes: Routes = [
    {
        path: '',
        component: AppShell,
        children:[
            {
                path: '',
                component: DashboardPage
            }
        ]
    }
];

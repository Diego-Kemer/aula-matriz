import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { LessonFormPage } from './features/lesson-form/pages/lesson-form-page/lesson-form-page';
import { LibraryPage } from './features/library/pages/library-page/library-page';

export const routes: Routes = [
    {
        path: '',
        component: AppShell,
        children:[
            {
                path: '',
                component: DashboardPage
            },
            {
                path: 'nueva-clase',
                component: LessonFormPage
            },
            {
                path: 'biblioteca',
                component: LibraryPage
            }
        ]
    }
];

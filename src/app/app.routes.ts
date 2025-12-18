import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Path } from 'leaflet';
import { IndexComponent } from './pages/index/index.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {
        path: '', 
        component: IndexComponent 
    },
    {
        path: 'login', 
        component: LoginPageComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];

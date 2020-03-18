import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RepairsComponent } from './repairs/repairs.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeePanelComponent } from './employee/employee-panel/employee-panel.component';

export const appRoutes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },
     { path: 'contact', component: ContactComponent },
     {
          path: '',
          runGuardsAndResolvers: 'always',
          canActivate: [AuthGuard],
          children: [
               { path: 'repairs', component: RepairsComponent, data: { roles: ['Client'] } },
               { path: 'employee', component: EmployeePanelComponent, data: { roles: ['Administrator', 'Serviceman', 'Salesman'] } }
          ]
     },
     { path: '**', redirectTo: '', pathMatch: 'full' }
];

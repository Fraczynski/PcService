import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const appRoutes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },
     {
          path: '',
          runGuardsAndResolvers: 'always',
          canActivate: [AuthGuard],
          children: [
               { path: 'history', component: HistoryComponent },
               { path: 'admin', component: AdminPanelComponent, data: { roles: ['Admin', 'Moderator'] } }
          ]
     },
     { path: '**', redirectTo: '', pathMatch: 'full' }
];

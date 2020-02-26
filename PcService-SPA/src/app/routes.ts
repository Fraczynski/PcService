import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },
     {
          path: '',
          runGuardsAndResolvers: 'always',
          canActivate: [AuthGuard],
          children: [
               { path: 'history', component: HistoryComponent },
               { path: 'messages', component: MessagesComponent },
          ]
     },
     { path: '**', redirectTo: '', pathMatch: 'full' }
];

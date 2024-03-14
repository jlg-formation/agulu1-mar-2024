import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ListComponent } from './stock/routes/list/list.component';
import { AddComponent } from './stock/routes/add/add.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'legal',
    loadComponent: () =>
      import('../app/routes/legal/legal.component').then(
        (c) => c.LegalComponent
      ),
  },
  {
    path: 'stock',
    component: ListComponent,
  },
  {
    path: 'stock/add',
    component: AddComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

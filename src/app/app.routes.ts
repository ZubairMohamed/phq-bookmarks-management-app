import { Routes } from '@angular/router';
import { OverviewPage } from './overview-page/overview-page';
import { Results } from './results/results';
import { Edit } from './edit/edit';

export const routes: Routes = [
  {
    path: '',
    component: OverviewPage,
  },
  {
    path: 'results',
    component: Results,
  },
  {
    path: 'edit',
    component: Edit,
  },
  { path: '**', redirectTo: '' },
];

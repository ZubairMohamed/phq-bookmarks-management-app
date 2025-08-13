import { Routes } from '@angular/router';
import { OverviewPage } from './overview-page/overview-page';
import { Results } from './results/results';

export const routes: Routes = [
  {
    path: '',
    component: OverviewPage,
  },
  {
    path: 'results',
    component: Results,
  },
  { path: '**', redirectTo: '' },
];

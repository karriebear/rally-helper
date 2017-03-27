import { Routes } from '@angular/router';

import { RallyQueryComponent } from './rally-query/rally-query.component';
import { RallySettings } from './settings/settings.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'stories', pathMatch: 'full' },
  { path: 'settings', component: RallySettings },
  { path: 'stories', component: RallyQueryComponent },
  { path: 'tasks', component: RallyQueryComponent,
    children: [
      { path: '', component: RallyQueryComponent },
      { path: ':org', component: RallyQueryComponent,
        children: [
          { path: '', component: RallyQueryComponent },
          { path: ':repo', component: RallyQueryComponent }
        ]
      }]
  }
];

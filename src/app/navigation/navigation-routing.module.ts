import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth-guard';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
    {
      path: '',
      component: NavigationComponent,
      canActivate: [AuthGuard],
      children: [
          {
            path: '',
            children: [
                { path: '', loadChildren: '../home/home.module#HomeModule' },
                { path: 'search', loadChildren: '../home/home.module#HomeModule' }
            ]
          }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthGuard ],
})
export class NavigationRoutingModule {}

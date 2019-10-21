import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'list/:conditions', component: ListComponent },
            { path: 'details', component: DetailsComponent }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
    static components = [ HomeComponent, ListComponent, DetailsComponent ];
}

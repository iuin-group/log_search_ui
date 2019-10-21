import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [NavigationComponent],
    imports: [ NavigationRoutingModule, SharedModule ],
})
export class NavigationModule { }

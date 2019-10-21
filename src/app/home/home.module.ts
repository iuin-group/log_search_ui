import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule} from './home-routing.module';
import { HomeService } from './home.service';

@NgModule({
  declarations: [ HomeRoutingModule.components ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ], providers: [HomeService]
})
export class HomeModule { }

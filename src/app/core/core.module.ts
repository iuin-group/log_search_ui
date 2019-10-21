import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientService } from './http/http-client.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [HttpClientService, AuthService]
})
export class CoreModule { }

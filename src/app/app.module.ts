import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,

        HttpClientModule,
        AppRoutingModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

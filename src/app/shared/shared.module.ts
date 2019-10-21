import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightPipe } from './pipes/highlight';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
    declarations: [ HighlightPipe, SafeHtmlPipe ],
    imports: [ ],
    exports: [
        CommonModule, ClarityModule, RouterModule, FormsModule, ReactiveFormsModule, MatPaginatorModule,
        HighlightPipe, SafeHtmlPipe
    ]
})
export class SharedModule { }

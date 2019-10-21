import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {


    form: FormGroup;
    indexs = [];
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
        private serivce: HomeService) { }

    ngOnInit() {
        this.form = this.fb.group({
            index: [''],
            keyWords:  ['']
        });
        this.serivce.getMCIndex().subscribe(res => {
            this.indexs = res;
            // this.form.patchValue({'index': res});
        });
    }

    ngAfterViewInit() {
        setTimeout( () => {
            if (this.route.firstChild) {
                this.route.firstChild.paramMap.subscribe( params => {
                    const conditions = JSON.parse(params.get('conditions'));
                    this.form.patchValue(conditions);
                });
            }
        }, 100);
    }


    search() {
        const conditions = JSON.stringify({ ...this.form.value });
        this.router.navigate([`/search/list/`, conditions]);
    }
}

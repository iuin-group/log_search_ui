import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from './list.service';
import { PageEvent, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
    selector: 'mc-log-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListService]
})
export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    index = '';
    keyWords = '';
    conditions:any = {};

    logInfos = [];

    pageSize = 10;
    pageIndex = 0;
    length = 0;
    maxPageNo = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    elapsed = 0;
    showLog: boolean = false;
    nolog: boolean = false;
    logDetail
    searchText: string = ''
    focusIndex: number = -1;
    elements;
    logExpanded: boolean = true;
    rangeNumber: number = 100

    currentFileName:string

    currentTimeTrace:string

    loading = false;
    constructor(private route: ActivatedRoute, private router: Router, private service: ListService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const conditions = JSON.parse(params.get('conditions'));
            this.conditions = conditions;
            this.keyWords = conditions.keyWords;
            this.index = conditions.index;
            setTimeout( () => {
                this.paginator.pageIndex = 0;
                this.changePage(this.paginator);
            }, 0);
        });
    }

    ngAfterViewInit() {
        setTimeout( () => {
            this.paginator.initialized.subscribe( () => {
                const { pageIndex, pageSize, pageSizeOptions, length } = this.paginator;
                this.changePage(Object.assign( {}, { pageIndex, pageSize, pageSizeOptions, length }));
            });
        }, 0);
    }

    changePage(event: PageEvent) {
        const started = Date.now();
        this.loading = true;
        this.service.search(this.conditions, event.pageIndex, event.pageSize).subscribe(res => {
            if (res) {
                this.length = res.total;
                this.logInfos = res.logInfos;
            }
            this.loading = false;
            this.elapsed = Date.now() - started;
        }, error => {
            this.loading = false;
        });
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    viewLog(logInfo: any) {
        let firstSpaceIndex = logInfo.message.indexOf(" ")
        let timemark: string = logInfo.message.substring(0,firstSpaceIndex)
        let logPath: string = logInfo.logPath
        let fileName: string = logPath.substring(logPath.lastIndexOf("/")+1)
        let indexName: string = this.conditions.index

        this.currentFileName = fileName

        this.currentTimeTrace = timemark

        this.service.viewLog(fileName,timemark,this.conditions.index).subscribe(res =>{
            this.logDetail = res.content
            this.logDetail  = this.logDetail.replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.showLog = true
            this.searchText = timemark
            this.logExpanded = true
        },error =>{
            console.log(error)
        });
        
    }

    closeLog() {
        this.showLog = false;
    }

    search(text: string) {
        this.focusIndex = -1;
        this.searchText = text;
        this.elements = document.getElementsByTagName('mark');
    }

    next() {
        if (this.elements && this.elements.length > 0) {
            let nextElement;
            let currentElement;
            if (this.focusIndex >= 0 && this.focusIndex + 1 < this.elements.length) {
                currentElement = this.elements.item(this.focusIndex++);
            } else {
                currentElement = this.elements.item(this.elements.length - 1);
                this.focusIndex = 0;
            }
            nextElement =  this.elements.item(this.focusIndex)
            currentElement.classList.remove("focus");
            nextElement.classList.add("focus");
            nextElement.scrollIntoView({block : 'center'});
        }
    }

    previous() {
        if (this.elements && this.elements.length > 0) {
            let perElement;
            let currentElement;
            if (this.focusIndex > 0) {
                currentElement = this.elements.item(this.focusIndex);
                perElement = this.elements.item(--this.focusIndex);
            } else {
                currentElement = this.elements.item(0);
                this.focusIndex = this.elements.length - 1;
                perElement = this.elements.item(this.focusIndex);
            }
            currentElement.classList.remove("focus");
            perElement.classList.add("focus");
            perElement.scrollIntoView({block : 'center'});
        }
    }

    downloadLog() {
    }

    moreDetail() {

        this.rangeNumber = this.rangeNumber + 100

        this.service.viewLog( this.currentFileName, this.currentTimeTrace,this.conditions.index,this.rangeNumber).subscribe(res =>{
            this.logDetail = res.content
            this.logDetail  = this.logDetail.replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.searchText = this.currentTimeTrace
        },error =>{
            console.log(error)
        });
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClientService } from 'src/app/core/http/http-client.service';
@Injectable()
export class ListService {

    private baseUrl = 'http://localhost:8080/api/v1';

    constructor(protected http: HttpClientService) {

    }

    search(body, from = 0, size = 10) {
        return this.http.post(`http://10.62.229.86:8090/searchByKeyWords?from=${from}&size=${size}`, body);
    }

    viewLog(fileName,timeMark,indexName,rangeNumber=100) {
        return this.http.get(`http://10.62.229.86:8090/escapi/getFileDetail?fileName=${fileName}&time=${timeMark}&indexName=${indexName}&rangeNumber=${rangeNumber}`);
    }
}

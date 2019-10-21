import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/http/http-client.service';

@Injectable()
export class HomeService {
    constructor(protected http: HttpClientService) { }

    getMCIndex() {
        return this.http.get('http://10.62.229.86:8090/escapi/getMCIndices');
    }
}

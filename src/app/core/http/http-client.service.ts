import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class HttpClientService {

    private baseUrl = 'http://localhost:8080/api/v1';

    private defaultOptions =  {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    get url() {
        return this.baseUrl;
    }

    constructor(protected http: HttpClient) {
        this.updateBaseUrl();
    }

    public updateBaseUrl() {
        const server = localStorage.getItem('avamar');
        if (server && server !== 'localhost') {
            const hostname = localStorage.getItem('avamar') || window.location.hostname;
            this.baseUrl = `https://${hostname}/api/v1`;
        }
    }

    private buildUrl(url: string) {
        if (url && (url.startsWith('http://') || url.startsWith('https://') )) {
            return url;
        } else if (url && url.charAt(0) !== '/') {
            return `${this.baseUrl}/${url}`;
        }
        return `${this.baseUrl}${url}`;
    }

    /**
     * Making a GET request
     * @param url resource URL
     */
    public get(url: string, options?: any): Observable<any> {
        return this.http.get(this.buildUrl(url), options ? options : this.defaultOptions).pipe(catchError(this.handleError));
    }

        /**
     * Making a GET request
     * @param url resource URL
     */
    public getText(url: string): Observable<string> {
        return this.http.get(this.buildUrl(url),  {responseType: 'text'}).pipe(catchError(this.handleError));
    }

    /**
     * Making a POST request
     * @param url resource URL
     * @param data body of the request
     * @param options HTTP options
     */
    public post(url: string, data: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    }): Observable<any> {
        return this.http.post(this.buildUrl(url), data, Object.assign({}, this.defaultOptions, options)).pipe(catchError(this.handleError));
    }

    public upload(url: string, data: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    }): Observable<any> {
        return this.http.post(this.buildUrl(url), data,
        Object.assign({}, null, options));
    }

    public put(url: string, data: any, options?: any): Observable<any> {
        return this.http.put(this.buildUrl(url), data, options ? options : this.defaultOptions).pipe(catchError(this.handleError));
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(this.buildUrl(url), this.defaultOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        const error = {
            error: {
                code: 0,
                error: 'Bad Request',
                details: {},
                event: {
                    summary: ''
                },
                exception: 'RestException',
                message: 'Something bad happened; please try again later.',
                status: 400,
                path: ''
            },
            message: 'Something bad happened; please try again later.',
            name: 'HttpErrorResponse',
            ok: false,
            status: 400
        };
        Object.assign(error, errorResponse || {});
        error.message = error.error.message || error.error.event.summary || error.message;
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(error);
        }
        // return an observable with a user-facing error message
        return throwError(error);
    }
}

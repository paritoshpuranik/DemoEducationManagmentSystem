import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public statusCode = new Subject<boolean>();

    constructor(
        private readonly http: HttpClient,
    ) { }

    get<T>(url: string) {
        return this.http.get<T>(`${environment.apiUrl}/${url}`).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    // HttpClient API get() method => Fetch details
    getList<T>(url: string) {
        return this.http.get<T[]>(`${environment.apiUrl}/${url}`).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    // HttpClient API post() method => Create new record
    post(paylods: any) {
        return this.http.post(environment.apiUrl, paylods).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    
    // Error handling 
    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    // post(url: string, body: any, options?: any): Observable<any>{
    //     const request = this.makeRequest('post', url, body, options);
    //     return this.sendRequest(request);
    // }

    // get(url: string, params?: any): Observable<any> {
    //     let request = this.makeRequest('get', url);
    //     if (params) {
    //         let query;
    //         if (params instanceof HttpParams) {
    //             query = params;
    //         } else {
    //             query = new HttpParams({ fromObject: { ...params } });
    //         }
    //         request = this.makeRequest('get', url, null, { params: query });
    //     }
    //     return this.sendRequest(request);
    // }

    // delete(url: string, options: any, hasBody?: boolean): Observable<any>  {
    //     let request = this.makeRequest('delete', url);
    //     if (options) {
    //         let query;
    //         if (options instanceof HttpParams) {
    //             query = options;
    //         } else {
    //             query = new HttpParams({ fromObject: { ...options } });
    //         }
    //         request = hasBody ? request.clone({body: options}) : this.makeRequest('delete', url, null, { params: query });
    //         return this.sendRequest(request);
    //     }
    // }

    // private makeRequest(type: string, url: string, body?: any, options?: any): HttpRequest<any> {
    //     return new HttpRequest(type, `${AppConfig.baseUrl}${url}`, body, options);
    // }

    // private sendRequest(request: HttpRequest<any>): Observable<any> {
    //     return this.http.request(request).pipe(
    //         catchError(this.handleError.bind(this)),
    //         skip(1),
    //         map(this.handleResponse.bind(this)));

    // }

    // parseMessage(msgWithTags: string): string {
    //     const indexOfOpenMessage = msgWithTags.indexOf('<Message>') + 9;
    //     const indexOfCloseMessage = msgWithTags.indexOf('</Message>');
    //     if (msgWithTags.includes('<Message>')) {
    //         return msgWithTags.substring(indexOfOpenMessage , indexOfCloseMessage);
    //     }
    //     return msgWithTags;

    // }

    // private handleError(error: HttpErrorResponse): Observable<any> {
    //     if (error.status === StatusCode.unauthorized){
    //         this.statusCode.next(false);
    //     }
    //     return throwError({
    //         code: error.status,
    //         message: this.parseMessage(error?.message)
    //     });
    // }

    // private handleResponse(event: HttpEvent<any>): any {
    //     switch (event.type) {
    //         case HttpEventType.UploadProgress:
    //             return event;
    //         case HttpEventType.Response:
    //             return event.body;
    //     }
    // }
}

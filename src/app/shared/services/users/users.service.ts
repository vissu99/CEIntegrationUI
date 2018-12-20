import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8081/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer AddYourToken' 
  })
};

@Injectable()
export class ContentsService {
    constructor( private http: HttpClient) {}
    public dataPathSets: any[] = [];

    public getRootContents(): Observable<any> {
            // return this.http.get('./assets/mock-data/users.json');
            return this.http.get(endpoint + 'getContents/?fromPath=', httpOptions).pipe(
                map(this.extractData));
    }

    public getFolderContents(path): Observable<any> {
        // return this.http.get('./assets/mock-data/users.json');
        console.log(typeof path);
        if(typeof path !== 'undefined'){
             return this.http.get(endpoint + 'getContents/?fromPath='+path, httpOptions).pipe(
            map(this.extractData));
        } else {
            return this.http.get(endpoint + 'getContents/?fromPath=', httpOptions).pipe(
                map(this.extractData));
        }
       
}
public downloadFile(path): Observable<any> {
    // return this.http.get('./assets/mock-data/users.json');
    console.log(typeof path);

        return this.http.get(endpoint + 'download?fromPath='+ path, httpOptions).pipe(
            map(this.extractData));

   
}
    private extractData(res: Response) {
        let body = res;
        return body || { };
      }
}


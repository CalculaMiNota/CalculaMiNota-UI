import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url: string, headers?: HttpHeaders) {
    if (headers === null) {
      headers = new HttpHeaders();
      headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Content-Type', 'application/json');
    }

    let httpOptions = {
      'headers': headers,
      'withCredentials': true
    };

    return this.http.get(environment.baseUrl + url, httpOptions);
  }

  public post(url: string, body: any, headers?: HttpHeaders) {
    if (headers === null) {
      headers = new HttpHeaders();
      //headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Content-Type', 'application/json');
      
    }

    let httpOptions = {
      'headers': headers,
      'withCredentials': true
    };

    return this.http.post(environment.baseUrl + url, body, httpOptions);
  }

  public put(url: string, body: any, headers?: HttpHeaders) {
    if (headers === null) {
      headers = new HttpHeaders();
      //headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Content-Type', 'application/json');
    }

    let httpOptions = {
      'headers': headers,
      'withCredentials': true
    };

    return this.http.put(environment.baseUrl + url, body, httpOptions);
  }

}

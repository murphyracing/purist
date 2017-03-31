import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PuristData {
  private url = 'http://192.168.2.91:3000/';

  constructor (private http: Http) {}

  getAll(path: string): Observable<any[]> {
    return this.http
      .get(this.url + path)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  postItem(path: string, text: string, complete: boolean): Observable<Object> {
    const body = {text: text, complete: complete};
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http
        .post(this.url + path, body, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

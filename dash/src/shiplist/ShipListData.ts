import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ShipListData {
  private url = 'http://localhost:3000/api/v1';

  constructor (private http: Http) {}

  postItem(text: string, complete: boolean): Observable<Object> {
    const body = {text: text, complete: complete};
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http
        .post(this.url, body, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

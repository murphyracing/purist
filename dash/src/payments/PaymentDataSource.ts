import {IPayment} from './domain/IPayment';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as socketIO from 'socket.io-client';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class PaymentDataSource {
  private rootUrl = 'http://192.168.2.91:3000';
  private appUrl = `${this.rootUrl}/payments`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor (private http: Http) {}

  all(): Observable<IPayment[]> {
    return this.http
      .get(this.appUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  serverMessages(): Observable<any> {
    const socket = socketIO(this.rootUrl);

    return new Observable(observer => {
      socket.on('message', data => observer.next(data));
      return () => socket.disconnect();
    });
  }

  update(id: number, updates: any[]): Observable<any> {
    const body = JSON.stringify(updates);
    return this.http
      .put(`${this.appUrl}/${id}`, body, this.options)
      .map((res: Response) => {
        const response = res.json();
        if (!response.success) {
          console.log(response.error);
          throw new Error(
            JSON.stringify(response.error) || 'Model update failed with no error message');
        }
        return response;
      })
      .catch(e =>
        Observable.throw(
          e instanceof Response ? e.json().error || 'Server error' : e
        )
      );
  }
}

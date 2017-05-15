import { List } from './list';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable()
export class ListServiceService {
  private api = `${environment.api ? environment.api : ''}/lists`;

  constructor(private http: Http) { }

  get(id: number): Promise<List> {
    return this.http
      .get(`${this.api}/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  create(list: List): Promise<List> {
    return this.http
      .post(`${this.api}`, list)
      .toPromise()
      .then(response => response.json());
  }

  update(list: List): Promise<List> {
    return this.http
      .put(`${this.api}/${list.id}`, list)
      .toPromise()
      .then(response => response.json());
  }

}

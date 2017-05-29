import { List } from './list';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable()
export class ListServiceService {
  private api = `${environment.api}/lists`;

  constructor(private http: Http) { }

  getAll(): Promise<Array<List>> {
    return this.http
      .get(`${this.api}`)
      .toPromise()
      .then(response => response.json());
  }

  get(id: string): Promise<List> {
    return this.http
      .get(`${this.api}/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  // Will upsert if list doesn't exist yet
  update(list: List): Promise<List> {
    return this.http
      .post(`${this.api}`, list)
      .toPromise()
      .then(response => response.json());
  }

}

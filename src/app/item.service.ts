import { Item } from './item';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
  api = 'http://localhost:3000';

  constructor(private http: Http) { }

  getAll(): Observable<Array<Item>> {
    return this.http
      .get(`${this.api}/items`)
      .map(response => response.json());
  }

  create() {

  }

  update() {

  }

  delete() {

  }

}

import { Item } from './item';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// TODO: Add .catch() to methods for error handling
// TODO: Unit tests

@Injectable()
export class ItemService {
  api = 'http://localhost:3000/items';

  constructor(private http: Http) { }

  getAll(): Promise<Array<Item>> {
    return this.http
      .get(`${this.api}`)
      .toPromise()
      .then(response => response.json());
  }

  create(item: Item): Promise<Item> {
    return this.http
      .post(`${this.api}`, item)
      .toPromise()
      .then(response => response.json());
  }

  update(item: Item): Promise<Item> {
    return this.http
      .put(`${this.api}/${item.id}`, item)
      .toPromise()
      .then(response => response.json());
  }

  delete(itemId: number) {
    return this.http
      .delete(`${this.api}/${itemId}`)
      .toPromise()
      .then(() => null);
  }

}

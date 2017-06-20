import { Item } from './../item';
import { ListServiceService } from './../list-service.service';
import { List } from './../list';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list = new List();
  total = 0;

  constructor(
    private listService: ListServiceService,
  ) { }


  ngOnInit() {
    this.listService
      .getAll()
      .then(lists => {
        if (lists.length > 0) {
          this.list = lists[0];
          this.getTotal();
        } else {
          this.list.items = [];
        }
      });
  }


  /**
 * @description Gets shopping list from API
 *
 * @param {number} id
 *
 * @memberof AppComponent
 */
  getList(id: string) {
    this.listService.get(id)
      .then(list => {
        this.list = list;
        this.getTotal();
      },
      () => this.list.items = []);
  }


  /**
   * @description Updates the list
   *
   * @param {List} list
   *
   * @memberof AppComponent
   */
  updateList(list: List) {
    this.listService
      .update(list)
      .then(newList => this.getList(newList._id),
      () => this.getList(list._id));
  }


  /**
   * @description Resets the list with zero items in it
   *
   * @param {List} list
   *
   * @memberof AppComponent
   */
  clearList(list: List) {
    if (window.confirm('Are you sure?')) {
      list.items = [];
      this.updateList(list);
    }
  }


  /**
   * @description Increases quantity of a list item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  increaseQty(item: Item) {
    item.quantity = item.quantity + 1;
    this.getTotal();
    this.updateList(this.list);
  }


  /**
   * @description Descreases quantity of a list item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  decreaseQty(item: Item) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      this.getTotal();
      this.updateList(this.list);
    }
  }


  /**
   * @description Removes an item from the list
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  removeFromList(item: Item) {
    item.quantity = 1;
    const index = _.findIndex(this.list.items, item);
    this.list.items.splice(index, 1);
    this.getTotal();
    this.updateList(this.list);
  }


  /**
   * @description Gets cost totals
   *
   * @private
   *
   * @memberof AppComponent
   */
  private getTotal() {
    let total = 0;
    _.forEach(this.list.items, item => {
      total = (item.price * item.quantity) + total;
    });

    this.total = total;
  }

}

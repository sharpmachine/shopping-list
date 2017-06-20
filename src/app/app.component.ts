import { ListServiceService } from './list-service.service';
import { Observable } from 'rxjs/Observable';
import { ItemService } from './item.service';
import { List } from './list';
import { Item } from './item';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';

// TODO: Strikethrough when list item is checked
// TODO: Only show actions on item hover
// TODO: Unit tests

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingList = new List();
  total = 0;

  constructor(
    private listService: ListServiceService,
  ) { }

  ngOnInit() {
    this.listService
      .getAll()
      .then(lists => {
        if (lists.length > 0) {
          this.shoppingList = lists[0];
          this.getTotal();
        } else {
          this.shoppingList.items = [];
        }
      });
  }


  // LIST METHODS


  /**
   * @description Gets shopping list from API
   *
   * @param {number} id
   *
   * @memberof AppComponent
   */
  getList(id: string) {
    console.log(id);
    this.listService.get(id)
      .then(list => {
        console.log('list: ', list);
        this.shoppingList = list;
        this.getTotal();
      },
      () => this.shoppingList.items = []);
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
    this.updateList(this.shoppingList);
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
      this.updateList(this.shoppingList);
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
    const index = _.findIndex(this.shoppingList.items, item);
    this.shoppingList.items.splice(index, 1);
    this.getTotal();
    this.updateList(this.shoppingList);
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
    _.forEach(this.shoppingList.items, item => {
      total = (item.price * item.quantity) + total;
    });

    this.total = total;
  }

}

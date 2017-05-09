import { ItemService } from './item.service';
import { List } from './list';
import { Item, Items } from './item';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

// TODO: Strikethrough when list item is checked
// TODO: Only show actions on item hover

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: Array<Item>;
  shoppingList = new List();
  total = 0;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
    this.shoppingList.items = [];
  }


  // Item methods

  getItems() {
    this.itemService
      .getAll()
      .subscribe(items => this.items = items);
  }

  createItem() {
    // TODO: Create item
  }

  updateItem() {
    // TODO: Update item
  }

  deleteItem() {
    // TODO: Delete item
  }


  /**
   * @description Add an item to a list
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  addItemToShoppingList(item: Item) {
    const isItemInList = Boolean(_.find(this.shoppingList.items, { 'name': item.name }));

    if (isItemInList) {
      const listItem = _.find(this.shoppingList.items, { 'name': item.name });
      listItem.quantity = listItem.quantity + 1;
    } else {
      this.shoppingList.items.push(item);
    }

    this.getTotal();
  }


  // List methods

  getList() {
    // TODO: Get List
  }

  updateList() {
    // TODO: Save list when item is added, removed or quantity changes
  }

  clearList() {
    // TODO: Reset list
  }


  /**
   * @description Increase quantity of a list item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  increaseQty(item: Item) {
    item.quantity = item.quantity + 1;
    this.getTotal();
  }


  /**
   * @description descrease quantity of a list item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  decreaseQty(item: Item) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      this.getTotal();
    }
  }


  /**
   * @description remove an item from the list
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
  }


  /**
   * @description get cost totals
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

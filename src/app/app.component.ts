import { Cart } from './cart';
import { Item, Items } from './item';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

// TODO: Edit item
// TODO: Create item
// TODO: Delete item

// TODO: Strikethrough when list item is checked

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  items: Array<Item>;
  shoppingList = new Cart();
  total = 0;

  ngOnInit() {
    this.items = Items;
    this.shoppingList.items = [];
  }

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

  getTotal() {
    let total = 0;
    _.forEach(this.shoppingList.items, item => {
      total = (item.price * item.quantity) + total;
    });

    this.total = total;
  }

  saveList() {
    // TODO: Save list when item is added, removed or quantity changes
  }

  increaseQty(item: Item) {
    item.quantity = item.quantity + 1;
    this.getTotal();
  }

  decreaseQty(item: Item) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      this.getTotal();
    }
  }

  removeFromList(item: Item) {
    const index = _.findIndex(this.shoppingList.items, item);
    this.shoppingList.items.splice(index, 1);
    this.getTotal();
  }

}

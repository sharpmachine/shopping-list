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
// TODO: Form validation
// TODO: Unit tests

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  item: FormGroup;
  items: Array<Item>;
  shoppingList = new List();
  shoppingListId = 1;
  total = 0;
  isEditMode = false;

  constructor(
    private itemService: ItemService,
    private listService: ListServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getItems();
    this.getList(this.shoppingListId);

    this.item = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
      isPriceEstimate: [false]
    });
  }


  // Item methods

  getItems() {
    this.itemService
      .getAll()
      .then(items => this.items = items);
  }

  createItem(item: Item) {
    item.quantity = 1;
    this.items.push(item);

    this.itemService
      .create(item)
      .then(newItem => {
        this.item.reset();
      }, () => {
        _.pull(this.items, item);
      });
  }

  updateItem(item: Item) {
    const currentItem = _.find(this.items, { 'id': item.id });
    const index = _.findIndex(this.items, currentItem);
    this.items.splice(index, 1, item);

    this.itemService
      .update(item)
      .then(updatedItem => {
        this.isEditMode = false;
        this.item.reset();
      }, () => {
        this.items.splice(index, 1, currentItem);
      });
  }

  deleteItem(item: Item) {
    if (window.confirm('Are you sure?')) {

      const index = _.findIndex(this.items, item);
      _.pull(this.items, item);

      this.itemService
        .delete(item.id)
        .then(null, () => this.items.splice(index, 1, item));
    }
  }

  editMode(item: Item) {
    this.isEditMode = true;
    this.item.patchValue(item);
  }

  onSubmit({ value, valid }: { value: Item, valid: boolean }, ) {
    if (valid) {
      this.isEditMode ? this.updateItem(value) : this.createItem(value);
    }
  }

  cancel() {
    this.item.reset();
    this.isEditMode = false;
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
    this.updateList(this.shoppingList);
  }


  // List methods

  getList(id: number) {
    this.listService.get(1)
      .then(list => {
        this.shoppingList = list;
        this.getTotal();
      },
      () => this.shoppingList.items = []);
  }

  updateList(list: List) {
    this.listService
      .update(list)
      .then(() => this.getList(list.id));
  }

  clearList(list: List) {
    if (window.confirm('Are you sure?')) {
      list.items = [];
      this.updateList(list);
    }
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
    this.updateList(this.shoppingList);
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
      this.updateList(this.shoppingList);
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
    this.updateList(this.shoppingList);
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

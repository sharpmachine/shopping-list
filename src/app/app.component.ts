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
// TODO: Add currency pipe to price input

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

    // Item form
    this.item = this.fb.group({
      _id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
      isPriceEstimate: [false],
      quantity: [1]
    });
  }


  // ITEM METHODS


  /**
   * @description Gets a list of items from API
   *
   *
   * @memberof AppComponent
   */
  getItems() {
    this.itemService
      .getAll()
      .then(items => this.items = items);
  }


  /**
   * @description Creates new item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  createItem(item: Item) {
    this.items.push(item);

    this.itemService
      .create(item)
      .then(newItem => {
        this.item.reset();
      }, () => {
        _.pull(this.items, item);
      });
  }


  /**
   * @description Updates an exisiting item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  updateItem(item: Item) {
    const currentItem = _.find(this.items, { '_id': item._id });
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


  /**
   * @description Deletes an existing item
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  deleteItem(item: Item) {
    if (window.confirm('Are you sure?')) {

      const index = _.findIndex(this.items, item);
      _.pull(this.items, item);

      this.itemService
        .delete(item._id)
        .then(null, () => this.items.splice(index, 1, item));
    }
  }


  /**
   * @description Puts the form in edit mode and loads selected item into form
   *
   * @param {Item} item
   *
   * @memberof AppComponent
   */
  editMode(item: Item) {
    this.isEditMode = true;
    this.item.patchValue(item);
  }


  /**
   * @description Routes to the appropriate action when submitting the item form
   *
   * @param {{ value: Item, valid: boolean }} { value, valid }
   *
   * @memberof AppComponent
   */
  onSubmit({ value, valid }: { value: Item, valid: boolean }, ) {
    if (valid) {
      this.isEditMode ? this.updateItem(value) : this.createItem(value);
    }
  }


  /**
   * @description Cancels creating or editing an item
   *
   *
   * @memberof AppComponent
   */
  cancel() {
    this.item.reset();
    this.isEditMode = false;
  }


  /**
   * @description Adds an item to a list
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


  // LIST METHODS


  /**
   * @description Gets shopping list from API
   *
   * @param {number} id
   *
   * @memberof AppComponent
   */
  getList(id: number) {
    this.listService.get(1)
      .then(list => {
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
      .then(() => this.getList(list.id),
      () => this.getList(list.id));
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

import { Item } from './item';

export class Cart {
    items: Array<Item>;
    total: number;
    tax: number;
    grandTotal: number;
};

export class Item {
    name: string;
    price: number;
    isPriceEstimate: boolean;
    quantity: number;
};

export const Items: Array<Item> = [
    {
        name: 'Pizza',
        price: 1.35,
        isPriceEstimate: false,
        quantity: 1
    },
    {
        name: 'Peanut Butter',
        price: 2.00,
        isPriceEstimate: true,
        quantity: 1
    }
];

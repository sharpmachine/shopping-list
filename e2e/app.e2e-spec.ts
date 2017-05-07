import { ShoppingListPage } from './app.po';

describe('shopping-list App', () => {
  let page: ShoppingListPage;

  beforeEach(() => {
    page = new ShoppingListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

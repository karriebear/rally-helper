import { RallyHelperPage } from './app.po';

describe('rally-helper App', () => {
  let page: RallyHelperPage;

  beforeEach(() => {
    page = new RallyHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

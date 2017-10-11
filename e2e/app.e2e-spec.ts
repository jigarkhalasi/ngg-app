import { GstPortalPage } from './app.po';

describe('gst-portal App', () => {
  let page: GstPortalPage;

  beforeEach(() => {
    page = new GstPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

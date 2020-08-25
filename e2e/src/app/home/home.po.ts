import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/home`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('p')).getText() as Promise<string>;
  }
}

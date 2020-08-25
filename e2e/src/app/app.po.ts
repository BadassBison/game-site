import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToUnknown(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/unknown`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root p')).getText() as Promise<string>;
  }
}

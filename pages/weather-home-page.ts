

import { Page } from '@playwright/test';
import { BasePage } from './base-page';


export class WeatherHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  
  /* ============ Elements =============== */

  readonly headerElements = {
    tab: (name: string) => `[id*="LocalsuiteNav-header"] span >> text=${name}`,
    savedLocation: (name: string) => `[id*="SavedLocations-header"] span >> text=${name}`,
  }

  /* ============ Methods =============== */

  async goToTab(name: string) {
    await this.waitAndClick(this.headerElements.tab(name));
    await Promise.all([
      this.waitForResponseSuccess("VideoBidRequestHandlerServlet"),
    ]);
  }

  /*==================Verification==============*/

  async verifySavedLocation(location: string) {
    await this.verifyElementVisible(this.headerElements.savedLocation(location));
  }
}
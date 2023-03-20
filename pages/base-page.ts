import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly localization: any;

  constructor(page: Page) {
    this.page = page;
  }

  /* ============ Methods =============== */

  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  async getColor(locator: string, index: number = 0) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("color")
    })
    return actualColor;
  }

  async getBackGroundColor(locator: string) {
    let element = this.page.locator(locator);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("background-color")
    })
    return actualColor;
  }

  async fillElementInFrame(frameLocator: string, locator: string, text: string) {
    const element = this.page.frameLocator(frameLocator).locator(locator);
    await element.click();
    await element.fill(text);
  }

  async clickItemByText(text: string) {
    await this.waitAndClick(`text='${text}'`);
  }

  async waitAndClick(locator: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible"
    });
    await element.click();
  }

  async waitAndFill(locator: string, value: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.fill(value);
  }

  async waitAndSelectByValue(locator: string, value: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ value: value });
  }

  async waitAndSelectByLabel(locator: string, value: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ label: value });
  }

  async waitAndSelectByIndex(locator: string, value: number, index: number = 0) {
    const element = this.page.locator(locator).nth(0);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ index: value });
  }

  async waitAndGetText(locator: string, index: number = 0): Promise<string> {
    const element = this.page.locator(locator).nth(index);
    let elementText = await element.innerText();
    if (elementText === null) {
      return "Element Text is null, Pls check element locator or its textContent";
    } else {
      return elementText;
    }
  }

  async waitAndVerifyText(locator: string, text: string, index: number = 0) {
    const element = this.page
      .locator(locator, {
        hasText: `/^${text}$/g`,
      })
      .nth(index);
    await element.waitFor({
      state: "visible",
    });
  }

  async waitForResponseSuccess(url: string) {
    await this.page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 200
    );
  }

  async waitForPageLoaded(url: string) {
    await this.page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 304
    );
  }

  /*==================Verification==============*/

  async verifyTextContent(locator: string, text: string) {
    let elementText = await this.page.textContent(locator);
    if (elementText != null) {
      elementText = elementText.trim();
      expect(elementText).toContain(text);
    }
  }

  async verifyValueContent(locator: string, text: string, index: number = 0) {
    let value = await this.page.locator(locator).nth(index).getAttribute("value");
    expect(value).toContain(text);
  }

  async verifyElementVisible(locator: string, index: number = 0, timeout?: number) {
    const element = this.page.locator(locator).nth(index);
    if (timeout) {
      await expect(element).toBeVisible({ timeout: timeout });
    } else {
      await expect(element).toBeVisible();
    }
  }

  async verifyElementNotVisible(locator: string, index: number = 0, timeout?: number) {
    const element = this.page.locator(locator).nth(index);
    if (timeout) {
      await expect(element).not.toBeVisible({ timeout: timeout });
    } else {
      await expect(element).not.toBeVisible();
    }
  }

  async verifyElementDisabled(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).toBeDisabled({ timeout: timeout });
    } else await expect(element).toBeDisabled({ timeout: timeout })
  }

  async verifyElementDisableWithAttribute(locator: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await expect(element).toHaveAttribute("aria-disabled", "true");
  }

  async verifyElementHasClass(locator: string, className: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await expect(element).toHaveClass(className);
  }

  async verifyBackgroundColor(locator: string, color: string, index: number = 0) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("background-color")
    })
    expect(color).toBe(actualColor)
  }

  async verifyElementColor(locator: string, color: string, index: number = 0) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("color")
    })
    expect(color).toBe(actualColor)
  }

  async softVerifyElementVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect.soft(element).toBeVisible({ timeout: timeout });
    } else {
      await expect.soft(element).toBeVisible();
    }
  }

  async softVerifyElementNotVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect.soft(element).not.toBeVisible({ timeout: timeout });
    } else {
      await expect.soft(element).not.toBeVisible();
    }
  }
}
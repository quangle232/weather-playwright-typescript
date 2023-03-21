import { Page } from '@playwright/test';
import { WeatherHomePage } from './weather-home-page';

export class TenDayPage extends WeatherHomePage {
  constructor(page: Page) {
    super(page);
  }

  /* ============ Page Elements =============== */

  readonly dailyForecastElements = {
    dateRow: (index: number) => `[id="detailIndex${index}"]`,
    dateTitle: '[data-testid="DailyContent"] span',
    temperatureValue: '[data-testid="ConditionsSummary"] [data-testid="TemperatureValue"]',
    humidityValue: '[data-testid="HumiditySection"] [data-testid="PercentageValue"]',
  }

  readonly dayOrNight = {
    day: 0,
    night: 1
  }

  /* ============ Page Actions =============== */

  async expandDateRow(index: number) {
    if (await this.isRowCollapsed(index)) {
      await this.waitAndClick(this.dailyForecastElements.dateRow(index));
    }
  }

  async collapseDateRow(index: number) {
    if (!await this.isRowCollapsed(index)) {
        await this.waitAndClick(this.dailyForecastElements.dateRow(index));
    }
  }

  async retrieveDayTitle(index: number) {
    const dayTemperature = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.dateTitle)
      .nth(0)
      .innerText();
    return dayTemperature;
  }

  async retrieveDayTemperature(index: number) {
    const dayTemperature = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.temperatureValue)
      .nth(this.dayOrNight.day)
      .innerText();
    return dayTemperature;
  }

  async retrieveDayHumidity(index: number) {
    const dayHumidity = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.humidityValue)
      .nth(this.dayOrNight.day)
      .innerText();
    return dayHumidity;
  }

  async retrieveNightTitle(index: number) {
    const dayTemperature = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.dateTitle)
      .nth(this.dayOrNight.night)
      .innerText();
    return dayTemperature;
  }

  async retrieveNightTemperature(index: number) {
    const nightTemperature = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.temperatureValue)
      .nth(this.dayOrNight.night)
      .innerText();
    return nightTemperature;
  }

  async retrieveNightHumidity(index: number) {
    const nightHumidity = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.humidityValue)
      .nth(this.dayOrNight.night)
      .innerText();
    return nightHumidity;
  }

  
  async retrieveWeatherInfo(numberOfDates: number) {
    // Maximum row on web is 15
    // Start from tomorrow, index from 1 (tomorrow) instead of 0 (today)
    if (numberOfDates > 15 || numberOfDates == 0) {
      numberOfDates = 15;
    }

    let jsonArray = [{}];
    for (let i = 1; i <= numberOfDates; i++) {
      await this.expandDateRow(i);
      const dayTitle = await this.retrieveDayTitle(i);
      const dayTemperature = await this.retrieveDayTemperature(i);
      const dayHumidity = await this.retrieveDayHumidity(i);
      const nightTemperature = await this.retrieveNightTemperature(i);
      const nightHumidity = await this.retrieveNightHumidity(i);
      
      const jsonObject = {
        date: dayTitle,
        temperature: {
          day: dayTemperature,
          night: dayHumidity,
        },
        humidity: {
          day: nightTemperature,
          night: nightHumidity,
        }
      };

      jsonArray.push(jsonObject);

    }
    jsonArray.shift();
    return jsonArray;
  }

  async isRowCollapsed(index: number){
    if(await this.page.locator(this.dailyForecastElements.dateRow(index)).getAttribute("data-track-string") === "false"){
        return false;
    }
    return true;
  }
}
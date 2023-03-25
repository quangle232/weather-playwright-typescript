import { Page } from '@playwright/test';
import { WeatherHomePage } from './weather-home-page';

export class TenDayPage extends WeatherHomePage {
  constructor(page: Page) {
    super(page);
  }

  /* ============ Page Elements =============== */

  readonly dailyForecastElements = {
    dateRow: (index: number) => `[id="detailIndex${index}"]`,
    dateTitle: '[data-testid="DailyContent"] h3 span',
    temperatureValue: '[data-testid="ConditionsSummary"] [data-testid="TemperatureValue"]',
    humidityValue: '[data-testid="HumiditySection"] [data-testid="PercentageValue"]',
  }

  readonly dayOrNight = {
    day: 0,
    night: 1,
    night_only: 0
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
    const dailyTitle = await this.page
      .locator(this.dailyForecastElements.dateRow(index))
      .locator(this.dailyForecastElements.dateTitle)
      .nth(0)
      .innerText();
    return dailyTitle;
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

  async retrieveTodayWeather(){
    const titleParentText = await this.page
        .locator(this.dailyForecastElements.dateRow(0))
        .locator(this.dailyForecastElements.dateTitle)
        .locator('..')
        .innerText();
    const dayTitle = await this.retrieveDayTitle(0);
    let dayTemperature = "";
    let dayHumidity = "";
    let nightTemperature = "";
    let nightHumidity = "";

    // 1 is only night
    // 2 is both day and night
    if(titleParentText.indexOf('Night')){      
      dayTemperature = "you retrieved data at night time";
      dayHumidity = "you retrieved data at night time";

      // Index of night is 0 now => using day temperature for quick apply
      nightTemperature = await this.retrieveDayTemperature(0);
      nightHumidity = await this.retrieveDayHumidity(0);

    } else{
      dayTemperature = await this.retrieveDayTemperature(0);
      dayHumidity = await this.retrieveDayHumidity(0);
      nightTemperature = await this.retrieveNightTemperature(0);
      nightHumidity = await this.retrieveNightHumidity(0);
    }
    
    return {
      date: dayTitle,
      temperature: {
        day: dayTemperature,
        night: nightTemperature,
      },
      humidity: {
        day: dayHumidity,
        night: nightHumidity,
      }
    };
  }
  
  async retrieveWeatherInfo(numberOfDates: number, ignoreToday: boolean) {
    // Maximum row on web is 15
        // Start from tomorrow, index from 1 (tomorrow) instead of 0 (today)

        // After submitted assignment: refactor to fix no such element: Unable to locate element:[id='detailIndex15']
    if(numberOfDates < 0){
      numberOfDates = 0;
    }

      // After submitted assignment: refactor to fix no such element: Unable to locate element: [id='detailIndex15']
      // if number = 0 will get today weather

    let jsonArray = [{}];

    if(ignoreToday){
      if(numberOfDates === 0){
          throw new Error("Cannot retrieve data if you ignore today and get today weather at the same time");
      }
    } else {
        jsonArray.push(await this.retrieveTodayWeather());

        if(numberOfDates === 0){
          jsonArray.shift();
          return jsonArray;
        }

      // Can get 15 days information include today
        if(numberOfDates <= 15){
          numberOfDates = numberOfDates - 1;
        }

  }

  if(numberOfDates >= 15){
    numberOfDates = 14;
  }

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
          night: nightTemperature,
        },
        humidity: {
          day: dayHumidity,
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
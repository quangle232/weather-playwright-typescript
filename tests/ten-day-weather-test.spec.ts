import { test } from '@playwright/test';
import ENV from '../helper/env-config';
import { TenDayPage } from '../pages/ten-day-page';
import { countryLocalization } from '../localization/localization';
import { generateCurrentDateTime } from '../helper/utilities';
import { exportJsonFile } from '../helper/export-json-file';

test(`Retrieve 10 days weather information and export to data file @exportJsonFile`, async ({ browser, browserName }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const tenDayPage = new TenDayPage(page);
    const localization = countryLocalization();
    let filePath: string = "";
    let jsonArray: any= [{}];

    await test.step('Should open 10 days weather page', async () => {
        await tenDayPage.goto(`${ENV.BASE_URL}${localization.suffix}`);
        await tenDayPage.goToTab(localization.tenDayTab);
    });

    await test.step('Should retrieve Temperature and Humidity of the first 10 days', async () => {
        jsonArray = await tenDayPage.retrieveWeatherInfo(10);
    });

    await test.step('Should export weather information to json file', async () => {
        filePath = `weather/weather${process.env.country}_${browserName}_${generateCurrentDateTime()}`;
        await exportJsonFile(jsonArray, filePath);
    });
});


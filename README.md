# Weather.com Test with Playwright and Typescript
This is the repository to run the test for weather.com with playwright tyepscript and page object model


# Getting Start
1. [Playwright](https://playwright.dev/)
2. [Execute test parallel](https://playwright.dev/docs/test-parallel)
3. [HTML Report](https://playwright.dev/docs/test-reporters)
4. [Allure Report](https://testersdock.com/allure-playwright/)
5. [Page Object Model](https://playwright.dev/docs/pom)
6. [Cross Environment](https://www.npmjs.com/package/cross-env)
7. [Integrate with Jenkins](https://qaautomationlabs.com/how-to-run-playwright-end-to-end-test-case-in-jenkins-pipelines/)
8. [Integrate with Github Action](https://playwright.dev/python/docs/ci)

# Installation
The following softwares are required:
- [NodeJS](https://nodejs.org/en/download)
- [JDK 19](https://docs.oracle.com/en/java/javase/18/install/overview-jdk-installation.html)

# Set up
1. CLone this repository to your machine
2. Running npm install to download and create node_modules section
 
```
npm install
```
3. Download playwright supported browsers by below command
```
npx playwright install --with-deps
```
4. If "cross-env" cannot be found on your machine, execute below command to install globaly
```
npx playwright install --with-deps
```

# Running test cases
From the terminal at root directory

- Using defined scripts to execute test cases with Singapore
```
npm run test:retrieveTenDaysDataFromSingapore
```
- Running with specific environment, country by passing the process environments (using country to get the correct localization to navigate or url)
```
// environment = [dev, production, uat]
// country = [singapore, vietnam]
// tag = [exportJsonFile]
cross-env test_env=${envionment} country=${country} npx playwright test ${scriptFilePath} --grep @${tag}
```
- Run the defined allure scripts command to generate the allure html report
```
npm run allure
```

# Report
- The html playwright test report will be generated at test-output/html folder, name "index.html"
![Screenshot 2023-03-21 at 7 57 20 am](https://user-images.githubusercontent.com/47560307/226496316-21db8468-d07f-4237-93de-1d8d38afdd2b.png)
- HTML Report Content
![Screenshot 2023-03-21 at 7 59 48 am](https://user-images.githubusercontent.com/47560307/226496420-4a8ddd54-1031-4c70-8aae-eeadb6076208.png)
![Screenshot 2023-03-21 at 7 59 53 am](https://user-images.githubusercontent.com/47560307/226496505-de2271b2-5859-4504-8d44-b9fc27ebfe61.png)
- The allure test report will be generated at test-output/allure-report, name "index.html" (you need to run the allure scripts to generate report. If not, there is only one folder "allure-results" only)
![Screenshot 2023-03-21 at 8 03 39 am](https://user-images.githubusercontent.com/47560307/226496850-77f4f71b-c201-40f0-a483-0f7a31d002c1.png)
- Allure report content:
![Screenshot 2023-03-21 at 8 04 18 am](https://user-images.githubusercontent.com/47560307/226496869-1405ea9e-6fdf-4dfe-bf95-668c877cf11c.png)
- The weather information json file will be generated at "weather/", name "weather_info_{contry}_{browserName}_{date}.json"
![Screenshot 2023-03-21 at 8 05 24 am](https://user-images.githubusercontent.com/47560307/226496918-efd87fc0-c84e-466f-9c5f-08da28b82ce5.png)

- Weather Information Json Schema:
```JSON
[{
  date: dayTitle,
  temperature: {
      day: dayTemperature,
      night: dayHumidity,
    },
  humidity: {
      day: nightTemperature,
      night: nightHumidity,
    }
 }
]
```

# Integrate with Jenkins
- Jenkins file pipeline was added to repository to integrate with Jenkins server
- Install NodeJS tools for Jenkins and using pipeline from SCM and enjoy CI Jenkins
![Screenshot 2023-03-21 at 8 06 34 am](https://user-images.githubusercontent.com/47560307/226497131-de1def32-0975-4d03-a6e8-3db389925899.png)
- Jenkins jobs are running with headed mode on localhost to demo.
- After running automation test cases the html report will be published to Jenkins job and the weather information json file will be added to artifacts
![Screenshot 2023-03-21 at 7 30 27 am](https://user-images.githubusercontent.com/47560307/226493894-fb6bcdc7-459f-4a69-9c58-1e13fa3db48f.png)
- Sample Weather HTML Report on Jenkins:
![Screenshot 2023-03-21 at 8 09 22 am](https://user-images.githubusercontent.com/47560307/226497249-be72d507-7fe4-472f-aeb0-1adff1737663.png)
![Screenshot 2023-03-21 at 8 09 29 am](https://user-images.githubusercontent.com/47560307/226497261-57446d54-fd09-4f97-9fa7-b225f731794f.png)
- Sample Allure Report on Jenkins:
![Screenshot 2023-03-21 at 8 10 24 am](https://user-images.githubusercontent.com/47560307/226497340-c50bc7a2-998f-4446-ba90-5285594be2c1.png)
- Sample Weather Information Artifacts
![Screenshot 2023-03-21 at 8 20 48 am](https://user-images.githubusercontent.com/47560307/226498333-da58dc16-9550-4a3b-b4c0-fd1e79a05ad2.png)

# Integrate with Github Action
- Github workflow was added to repository to run with github action
- Github workflow is running with headed mode to demo
![Screenshot 2023-03-21 at 8 23 14 am](https://user-images.githubusercontent.com/47560307/226498564-3a8ea308-bab2-4671-8f6c-4924c329eb24.png)
- Select environment and country to run
![Screenshot 2023-03-21 at 8 23 24 am](https://user-images.githubusercontent.com/47560307/226498608-9eefa707-d8f7-41fb-8c2a-c781cee15359.png)
- After running automation test cases, the report will be publised to the artifacts section, you will need to download to open it
![Screenshot 2023-03-21 at 8 25 44 am](https://user-images.githubusercontent.com/47560307/226498812-53fbb61f-1e5a-4a74-a36c-4973ea73c0f8.png)


## ENJOYING AUTOMATION WITH PLAYWRIGHT AND CI!!!







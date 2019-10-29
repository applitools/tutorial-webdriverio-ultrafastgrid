"use strict";

const chromedriver = require('chromedriver');
const webdriverio = require('webdriverio');
const {
  By,
  Eyes,
  Target,
  VisualGridRunner
} = require('@applitools/eyes.webdriverio');
const {
  BrowserType,
  Configuration,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-selenium');

(async () => {
  chromedriver.start();

  // Open a Chrome browser.
  const chrome = {
    desiredCapabilities: {
      browserName: 'chrome'
    }
  };
  let driver = webdriverio.remote(chrome);
  await driver.init();

  // Initialize the eyes SDK with 3 concurrent runners
  const eyes = new Eyes(new VisualGridRunner(3));

  try {
    const configuration = new Configuration();
    configuration.setAppName('Demo app');
    configuration.setTestName('WebdriverIO Visual Grid test!');

    //Add Chrome browser with two different viewports
    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.CHROME);

    //Add Firefox browser with two different viewports
    configuration.addBrowser(1200, 800, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.FIREFOX);

    //Add iPhone 4 with Portrait mode
    configuration.addDeviceEmulation(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);

    // Set your private API key here or in the "APPLITOOLS_API_KEY" environment variable
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setConfiguration(configuration);

    driver = await eyes.open(driver);

    // Navigate the browser to the "hello world!" web-site.
    await driver.url("https://demo.applitools.com");

    //⭐️To see visual bugs, change the above URL to:
    //  https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check("Login Page", Target.window());

    // Click the "Log in" button.
    await driver.click(By.id("log-in"));

    // Visual checkpoint #2.
    await eyes.check("App page", Target.window());

    console.log(
      `Please wait, we are now..
      1. Uploading the app's resources (html, css, images)
      2. Rendering them in different browsers, emulators
      3. Analyzing them using our A.I. 

      ...you should see the result within 15 - 60 seconds depending on your internet speed, # combinations and how heavy your app is.
    `
    );

    // End the test.
    // const results = await eyes.close(); // will return only first TestResults, but as we have two browsers, we need more results
    const results = await eyes.getRunner().getAllTestResults(false);
    console.log(results);
    console.log(results.getAllResults());
  } finally {
    // Close the browser.
    await driver.end();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();

    chromedriver.stop();
  }
})();

"use strict";

const chromedriver = require("chromedriver");
const webdriverio = require("webdriverio");
const {
  By,
  Eyes,
  Target,
  VisualGridRunner
} = require("@applitools/eyes.webdriverio");
const {
  BrowserType,
  SeleniumConfiguration,
  DeviceName,
  ScreenOrientation
} = require("@applitools/eyes-selenium");

(async () => {
  chromedriver.start();

  // Open a Chrome browser.
  const chrome = {
    desiredCapabilities: {
      browserName: "chrome"
    }
  };
  let driver = webdriverio.remote(chrome);
  await driver.init();

  // Initialize the eyes SDK with 3 concurrent runners
  const eyes = new Eyes(new VisualGridRunner(3));

  try {
    const configuration = new SeleniumConfiguration();
    configuration.appName = "Eyes Examples";
    configuration.testName = "My first Javascript test!";

    //Add Chrome browser (1200 X 800)
    configuration.addBrowser(1200, 800, BrowserType.CHROME);

    //Add Firefox browser (1200 X 800)
    configuration.addBrowser(1200, 800, BrowserType.FIREFOX);

    //Add iPhone4 device emulation in Portrait mode
    configuration.addDevice(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);

    // Set your private API key here or in the "APPLITOOLS_API_KEY" environment variable
    configuration.apiKey = process.env.APPLITOOLS_API_KEY;
    eyes.configuration = configuration;

    driver = await eyes.open(driver);

    // Navigate the browser to the "hello world!" web-site.
    await driver.url("https://demo.applitools.com");

    //⭐️To see visual bugs, change the above URL to:
    //  https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check("Login Page", Target.window());

    // Click the "Click me!" button.
    await driver.click(By.id("log-in"));

    // Visual checkpoint #2.
    await eyes.check("Click!", Target.window());

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
    const results = await eyes.getRunner().getAllResults(false);
    console.log(results);
  } finally {
    // Close the browser.
    await driver.end();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();

    chromedriver.stop();
  }
})();

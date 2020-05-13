'use strict';

const webdriverio = require('webdriverio');
const {
    VisualGridRunner,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation
} = require('@applitools/eyes.webdriverio');


let driver;
let eyes;

describe('wdio', function () {

    beforeEach(async () => {
        const chrome = {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        };

        // Use Chrome browser
        driver = webdriverio.remote(chrome);
        await driver.init();

        // Initialize the Runner for your test.
        const runner = new VisualGridRunner();

        // Initialize the eyes SDK
        eyes = new Eyes(runner);

        // Initialize the eyes configuration
        const configuration = new Configuration();

        // You can get your api key from the Applitools dashboard
        configuration.setApiKey('APPLITOOLS_API_KEY')

        // Set new batch
        configuration.setBatch(new BatchInfo('Ultrafast Batch'))

        // Add browsers with different viewports
        configuration.addBrowser(800, 600, BrowserType.CHROME);
        configuration.addBrowser(700, 500, BrowserType.FIREFOX);
        configuration.addBrowser(1600, 1200, BrowserType.IE_11);
        configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
        configuration.addBrowser(800, 600, BrowserType.SAFARI);

        // Add mobile emulation devices in Portrait mode
        configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);

        // Set the configuration to eyes
        eyes.setConfiguration(configuration);
    });

    it('Ultrafast grid Test', async () => {

        // Start the test by setting AUT's name, test name and viewport size (width X height)
        driver = await eyes.open(driver, 'Demo App', 'Ultrafast grid demo', new RectangleSize(800, 600));

        // Navigate the browser to the "ACME" demo app.
        await driver.url('https://demo.applitools.com');

        // To see visual bugs after the first run, use the commented line below instead.
        // await driver.url("https://demo.applitools.com/index_v2.html");

        // Visual checkpoint #1.
        await eyes.check('Login Window', Target.window().fully());

        // Click the "Log in" button.
        await driver.click('#log-in');

        // Visual checkpoint #2.
        await eyes.check('App Window', Target.window().fully());

        // End the test
        await eyes.closeAsync();
    });

    afterEach(async () => {
        // Close the browser
        await driver.end();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortIfNotClosed();

        // Wait and collect all test results
        const results = await eyes.getRunner().getAllTestResults(false);
        console.log(results);
        console.log(results.getAllResults());
    });

});
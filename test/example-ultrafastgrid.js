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
    ScreenOrientation,
    RunnerOptions
} = require('@applitools/eyes.webdriverio');


let driver;
let eyes;

describe('wdio', function () {

    before(async () => {
        const chrome = {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            host: (process.env.CI === 'true') ? 'selenium' : '127.0.0.1'
        };

        // Create a new chrome web driver
        driver = webdriverio.remote(chrome);
        await driver.init();

        // Create a runner with concurrency of 1
        const runnerOptions = new RunnerOptions().testConcurrency(1);
        const runner = new VisualGridRunner(runnerOptions);

        // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
        eyes = new Eyes(runner);

        // Initialize eyes Configuration
        const configuration = new Configuration();

        // create a new batch info instance and set it to the configuration
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

        // Call Open on eyes to initialize a test session
        await eyes.open(driver, 'Demo App', 'Ultrafast grid demo', new RectangleSize(800, 600));

        // Navigate the browser to the "ACME" demo app.
        // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
        // but then change the above URL to https://demo.applitools.com/index_v2.html
        // (for the 2nd run)
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
        await eyes.close();
    });

    after(async () => {
        // Close the browser
        await driver.end();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abort();

        const results = await eyes.getRunner().getAllTestResults();
        console.log(results);
    });

});

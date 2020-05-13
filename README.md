### Pre-requisites:

1. Download Selenium Standalone server [here](https://www.seleniumhq.org/download/)
    * Note that this is a `jar` file. So you should also have Java installed on your machine.
2. Chrome Webdriver is on your machine and is in the PATH. Here are some resources from the internet that'll help you.
   * https://splinter.readthedocs.io/en/0.1/setup-chrome.html
   * https://stackoverflow.com/questions/38081021/using-selenium-on-mac-chrome
   * https://www.youtube.com/watch?time_continue=182&v=dz59GsdvUF8  
3. Run the standalone server jar file - it should look something like below:
    * `java -jar -Dwebdriver.chrome.driver=./chromedriver  selenium-server-standalone-3.141.59.jar` (Replace the jar file name with your jar file name) 
    * This will run Selenium on localhost and on port 4444
4. Install Node.js from [here](https://nodejs.org/en/)


### Running the example:

1. Download the example
    * Option 1: `git clone https://github.com/applitools/tutorial-webdriverio-ultrafastgrid.git`
    * Option 2: Download it as a Zip file and extract it
2. CD into the `tutorial-webdriverio-ulgrafastgrid` folder
3. Change the `APPLITOOLS_API_KEY` with your own.
    * Login to Applitools > Click on the Person icon > My API Key
4. run `npm install`
5. run `npm test`

### Adding to an existing Node.js example

```sh
npm install "@applitools/eyes.webdriverio" --save-dev

```

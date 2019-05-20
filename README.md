### Pre-requisites:

1. Download Selenium Standalone server [https://www.seleniumhq.org/download/]
    * Note that this is a `jar` file. So you should also have Java installed on your machine.
2. Run the standalone server jar file - it should look something like below:
    * `java -jar selenium-server-standalone-3.141.59.jar` (Replace the jar file name with your jar file name)
    * This will run Selenium on localhost and on port 4444
3. Install Node.js from [here](https://nodejs.org/en/)


### Running the example:

1. Download the example
    * Option 1: `git clone https://github.com/applitools/tutorial-webdriverio-visualgrid.git`
    * Option 2: Download it as a Zip file and extract it
2. CD into the `tutorial-webdriverio-visualgrid` folder
3. run `npm install`
4. run `nmp test`

### Adding to an existing Node.js example

```sh
npm install "@applitools/eyes-selenium" "@applitools/eyes.webdriverio" --save-dev

```

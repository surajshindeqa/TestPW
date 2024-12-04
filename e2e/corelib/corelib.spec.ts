import { Given, When, Then, setDefaultTimeout, After, Status, Before } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import * as fs from 'fs';



let browser: Browser, context: BrowserContext, page: Page;

Before(async function () {

    try {
        browser = await chromium.launch({
            headless: false,
            args: [
                '--start-maximized'
            ]
        });

        context = await browser.newContext({
            viewport: null,
            javaScriptEnabled: true,
            recordVideo: {
                dir: './videos/',
                size: { width: 1280, height: 720 } // Directory to save videos
            },
            permissions: ['microphone']
        });

        page = await context.newPage();

    } catch (error) {
        console.error('Test failed:', error);
        throw error;
    }
});

After(async function (scenario) {

    if (scenario.result?.status === Status.FAILED) {

        // Capture a screenshot on failure
        const screenshot = await page.screenshot({
            path: `./reports/${scenario.pickle.name}.png`
        });

        this.attach(screenshot, 'image/png');
    }

    const videoPath = await page.video()?.path();

    if (videoPath) {

        const videoBuffer = fs.readFileSync(videoPath);

        // Attach video to Allure report
        this.attach(
            videoBuffer,
            'video/webm'
        );
    } else {
        console.error('Video path is undefined.');
    }

    await page.close();
    await context.close();
    await browser.close();

});

export function getPage(): Page {

    return page;

}
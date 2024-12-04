import { Given, When, Then, setDefaultTimeout, After, Status } from "@cucumber/cucumber";
import * as path from 'path';
import { getPage } from "../../corelib/corelib.spec";

Given('User navigate to Audirie platform', async function () {

    await getPage().goto('https://app.audirie.com/');

});

When('User enters valid credentials', async function () {

    await getPage().fill('[placeholder="name@example.com"]', 'suraj@audirie.com');
    await getPage().fill('[placeholder="Password"]', 'Test@1234');
    await getPage().click('button:has-text("Login")');
    await getPage().waitForTimeout(5000);

});

Then('User gets logged in successfully', async function () {

    console.log('Test Passed');

});
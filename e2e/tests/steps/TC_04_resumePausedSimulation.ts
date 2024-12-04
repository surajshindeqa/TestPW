import { Given, When, Then, setDefaultTimeout, After, Status } from "@cucumber/cucumber";
import * as path from 'path';
import { getPage } from "../../corelib/corelib.spec";
import { test, expect } from '@playwright/test';

setDefaultTimeout(50000);

Given('User is logged in', async function () {

    await getPage().goto('https://app.audirie.com/');
    await getPage().fill('[placeholder="name@example.com"]', 'suraj@audirie.com');
    await getPage().fill('[placeholder="Password"]', 'Test@1234');
    await getPage().click('button:has-text("Login")');

});

When('User resumes paused Aged Care simulation', async function () {

});

Then('Simulation should repeat the last sentence from last time', async function () {

    await expect(getPage().locator('//div[@id="questions"]/div[2]/p')).toHaveText('Submitted');

});

Then('Simulation should be able to be paused', async function () {

});

Then('Dashboard should state simulation is paused again', async function () {

});
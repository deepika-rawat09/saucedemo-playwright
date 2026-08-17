import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { testData } from '../test data/testData';

test.describe('SauceDemo Login Tests', () => {

    test('Verify user can login successfully', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            testData.username,
            testData.password,
        );

        await loginPage.verifyLoginSuccessful();
    });

});
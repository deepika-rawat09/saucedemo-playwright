import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { testData } from '../test data/testData';


test.describe('SauceDemo Purchase Flow', () => {

    test('User should be able to purchase a product', async ({ page }) => {

        // -----------------------------
        // 1. Login
        // -----------------------------

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            testData.username,
            testData.password
        );

        await loginPage.verifyLoginSuccessful();


        // -----------------------------
        // 2. Navigate to Dashboard
        // -----------------------------

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.verifyInventoryPage();


        // -----------------------------
        // 3. Select Product
        // -----------------------------

        const productName = testData.product;


        // -----------------------------
        // 4. Add Product to Cart
        // -----------------------------

        await inventoryPage.addProductToCart(productName);

        await inventoryPage.verifyCartItemCount('1');


        // -----------------------------
        // 5. Open Cart
        // -----------------------------

        await inventoryPage.openCart();


        // -----------------------------
        // 6. Validate Cart
        // -----------------------------

        const cartPage = new CartPage(page);

        await cartPage.verifyCartPage();

        await cartPage.verifyProductInCart(productName);


        // -----------------------------
        // 7. Checkout
        // -----------------------------

        await cartPage.clickCheckout();


        // -----------------------------
        // 8. Enter Customer Information
        // -----------------------------

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCustomerDetails(
            testData.firstName,
            testData.lastName,
            testData.postalCode
        );


        // -----------------------------
        // 9. Continue
        // -----------------------------

        await checkoutPage.clickContinue();


        // -----------------------------
        // 10. Validate Checkout Overview
        // -----------------------------

        await expect(
            page.locator('.checkout_summary_container')
        ).toBeVisible();


        // -----------------------------
        // 11. Finish Purchase
        // -----------------------------

        await checkoutPage.clickFinish();


        // -----------------------------
        // 12. Validate Order Confirmation
        // -----------------------------

        await checkoutPage.verifyOrderConfirmation();

    });

});
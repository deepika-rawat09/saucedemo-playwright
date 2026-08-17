import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {

    readonly page: Page;

    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.cartItems = page.locator('.cart_item');

        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });

        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping'
        });
    }

    async verifyCartPage() {

        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyProductInCart(productName: string) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();
    }

    async clickCheckout() {

        await this.checkoutButton.click();
    }
}
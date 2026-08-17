import {  type Page, type Locator, expect} from '@playwright/test';

export class InventoryPage {

    readonly page: Page;

    readonly inventoryContainer: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {

        this.page = page;

        this.inventoryContainer = page.locator('.inventory_list');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async verifyInventoryPage() {

        await expect(this.page).toHaveURL(/inventory.html/);

        await expect(this.inventoryContainer).toBeVisible();
    }

    async addProductToCart(productName: string) {

        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async openProduct(productName: string) {

        await this.page
            .getByText(productName, { exact: true })
            .click();
    }

    async openCart() {

        await this.cartLink.click();
    }

    async verifyCartItemCount(count: string) {

        await expect(this.cartBadge).toHaveText(count);
    }
}
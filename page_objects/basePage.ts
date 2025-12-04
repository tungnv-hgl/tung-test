import { Page } from 'playwright';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async fillInput(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }

    async verifyText(selector: string, expectedText: string): Promise<void> {
        const textContent = await this.page.textContent(selector);
        if (textContent !== expectedText) {
            throw new Error(`Expected text "${expectedText}" but found "${textContent}"`);
        }
    }
}
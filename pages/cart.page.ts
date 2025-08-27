import { Page } from "@playwright/test";
import { Product } from "../tools/productManage";

export class cartPage{
    readonly page:Page
    constructor(page: Page){
        this.page=page
    }
    elements = {
        checkoutBtn : ()=> this.page.locator("#checkout"),
        ctnShopping: ()=> this.page.locator("#continue-shopping"),
        listProducts: ()=> this.page.locator(".cart_item")
    }

    boughtProducts: Product[] = []

    async getBoughtProducts(){
        const count = await this.elements.listProducts().count();
        for (let i = 0; i < count; i++) {
            const item = await this.elements.listProducts().nth(i);
            const name = await item.locator('.inventory_item_name').innerText();
            const price = await item.locator('.inventory_item_price').innerText();
            const description = await item.locator('.inventory_item_desc').innerText();
            this.boughtProducts.push(new Product(name,description,price));
        }
        return this.boughtProducts
    }
}
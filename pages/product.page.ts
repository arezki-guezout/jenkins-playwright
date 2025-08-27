import { Page } from "@playwright/test";
import { Product } from "../tools/productManage";

export class productPage{
    readonly page: Page
    constructor(page: Page)
    {this.page=page}

    elements = {
        menuBtn : ()=> this.page.locator("#react-burger-menu-btn"),
        triSelect : () => this.page.locator("[data-test='product-sort-container']"),
        panierBtn : () => this.page.locator("[data-test='shopping-cart-link']"),
        productList : () => this.page.locator(".inventory_item"),
        addBtn: (name) => this.page.locator("#add-to-cart-"+name.toLowerCase().replace(/\s+/g, '-')),
        removeBtn: (name) => this.page.locator("#remove-"+name.toLowerCase().replace(/\s+/g, '-')),
    }
    products : Product[] = []
    selectedProduct: Product[] =[]

    async allerMenu() {
        await this.elements.menuBtn().click()
    }
    async allerPanier() {
        await this.elements.panierBtn().click()
    }
    async getRandomProducts(nb: number){
        const count = await this.elements.productList().count();
        for (let i = 0; i < count; i++) {
            const item = await this.elements.productList().nth(i);
            const name = await item.locator('.inventory_item_name').innerText();
            const price = await item.locator('.inventory_item_price').innerText();
            const description = await item.locator('.inventory_item_desc').innerText();
            this.products.push(new Product(name,description,price));
        }
        
        for(let i=0;i<nb;i++)
        {
            let index=Math.round(Math.random()*(nb-i))
            this.selectedProduct.push(this.products[index])
            this.products.splice(index,1)
        }
        return this.selectedProduct
    }
    async addProduct(name: string){
        await this.elements.addBtn(name).click()
    }
    async removeProduct(name: string){
        await this.elements.removeBtn(name).click()
    }
}
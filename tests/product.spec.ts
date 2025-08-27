import test, { expect } from "@playwright/test";
import { Login } from "../pages/login.page";
import { productPage } from "../pages/product.page";
import { cartPage } from "../pages/cart.page";

test.beforeEach("se connecter", async ({page})=>{
    await page.goto("http://saucedemo.com/")
    const lp = new Login(page)
    await lp.saisirUsername("standard_user")
    await lp.saisirPassword("secret_sauce")
    await lp.cliquer()
})

test("ajout de produits",{tag: '@sanity'}, async ({page})=>{
    const pp = new productPage(page)
    
    const produits= await pp.getRandomProducts(2)
    console.log(produits)
    for (let i=0;i<(await produits).length;i++){
        pp.addProduct(await(produits[i].title))
    }
    await pp.allerPanier()
    const cp = new cartPage(page)
    const bp= await cp.getBoughtProducts()
    console.log(bp)
    await expect(produits.sort()).toEqual(bp.sort())

})
import  { test,expect } from "@playwright/test";
import { Login } from "../pages/login.page";


test('login test', {tag: '@smoke'}, async ({page})=>{
    await page.goto("http://saucedemo.com/")
    const lp = new Login(page)
    await lp.saisirUsername("standard_user")
    await lp.saisirPassword("secret_sauce")
    await lp.cliquer()
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
})

test.fail('login test1', {tag: '@regression'}, async ({page})=>{
    await page.goto("http://saucedemo.com/")
    const lp = new Login(page)
    await lp.saisirUsername("standard_user1")
    await lp.saisirPassword("secret_sauce")
    await lp.cliquer()
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
})
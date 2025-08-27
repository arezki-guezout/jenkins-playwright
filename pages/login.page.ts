import { Page } from "@playwright/test";

export class Login {
    readonly page : Page
    constructor(page : Page)
    {
        this.page=page
    }
    elements = {
        username: ()=> this.page.locator("#user-name"),
        password: ()=> this.page.getByPlaceholder("Password"),
        submit: ()=> this.page.getByText("Login")
    }
    

    async saisirUsername(username: string){
        await this.elements.username().fill(username)
    }
    async saisirPassword(password: string){
        await this.elements.password().fill(password)
    }
    async cliquer(){
        await this.elements.submit().click()
    }
}
#!/bin/node
const FetchBase = require("fetch-base").FetchBase
const chalk = require("chalk")

class SiteFetcher extends FetchBase {
    constructor() {
        super({
            ip: "mikeads.com",
            protocol: "https",
            port: 80,
            api: ""
        })
        this.endpoint = ""
    }
    handleFetchResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText))
        }
        return response.text()
    }
}

new SiteFetcher().get().then((text: string) => {
    console.log(chalk.green(text))
})

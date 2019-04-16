#!/usr/bin/bash

import { FetchBase } from "fetch-base"
import chalk from "chalk"

class SiteFetcher extends FetchBase<any> {
    constructor() {
        super({
            protocol: "https",
            ip: "mikeads.com"
        })
    }
    handleFetchResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(new Error(response.statusText))
        }
        return response.text()
    }
}

new SiteFetcher().get().then((text: any) => {
    console.log(chalk.green(text))
})

import { FetchBase } from "fetch-base"
import * as CodeMirror from "codemirror"
import "codemirror/mode/javascript/javascript"
import { Plant } from "../../lib/dist"

class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            port: 8080,
            api: "plant",
            protocol: "http",
            ip: "localhost"
        })
    }
}

var showResponse = (summary: string, obj: any) => {
    let detEl = document.createElement("details")
    let sumryEl = document.createElement("summary")
    let sumry = document.createTextNode(summary)
    sumryEl.appendChild(sumry)
    detEl.appendChild(sumryEl)
    let objStr = document.createTextNode(JSON.stringify(obj))
    detEl.appendChild(objStr)
    document.body.appendChild(document.createElement("br"))
    document.body.appendChild(detEl)
    document.body.appendChild(document.createElement("br"))
}

var editor = (code: string) => {
    return CodeMirror(document.body, {
        value: code,
        mode: "text/typescript",
        theme: "monokai",
        lineNumbers: true,
        foldGutter: true,
        lineWrapping: true,
        readOnly: true
    })
}
;(async function() {
    editor(`
import { FetchBase } from "fetch-base"
import { Plant } from "../../lib/dist"

class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            port: 8080,
            api: "plant",
            protocol: "http",
            ip: "localhost"
        })
    }
}

let plantService = new PlantService()
let p = new Plant("southern magnolia", "magnolia", "grandiflora")
let postResult = await plantService.post(p)
console.log(postResult)
`)
    let plantService = new PlantService()
    let p = new Plant("southern magnolia", "magnolia", "grandiflora")
    let postResult = await plantService.post(p)
    showResponse("post result", postResult)

    let plant = await plantService.find(postResult.id)
    editor(`
let plant = await plantService.find(postResult.id)
console.log(plant)
    `)
    showResponse("find result", plant)

    let tmpPlant = JSON.parse(JSON.stringify(plant)) // make a copy of 'find' result
    tmpPlant.commonName = "Southern Magnolia" // change something
    let putResult = await plantService.put(tmpPlant)
    editor(`
let tmpPlant = JSON.parse(JSON.stringify(plant)) // make a copy of 'find' result
tmpPlant.commonName = "Southern Magnolia" // change something
let putResult = await plantService.put(tmpPlant)
console.log(putResult)
    `)
    showResponse("put result", putResult)

    let post2Result = await plantService.post(
        new Plant("banana shrub", "magnolia", "fuscata")
    )
    editor(`
let post2Result = await plantService.post(
    new Plant("banana shrub", "magnolia", "fuscata")
)
    `)
    showResponse("post2 result", post2Result)

    let plants = await plantService.get()
    editor("let plants = await plantService.get()")
    showResponse("get result", plants)

    let delete1Result = await plantService.delete(plants[0])
    editor("let delete1Result = await plantService.delete(plants[0])")
    showResponse("delete 1 result", delete1Result)

    let delete2Result = await plantService.delete(plants[1])
    editor("let delete2Result = await plantService.delete(plants[1])")
    showResponse("Here is the delete 2 result", delete2Result)

    let remainingPlants = await plantService.get()
    editor("let remainingPlants = await plantService.get()")
    showResponse(
        "Here is the get result after deleting entities: ",
        remainingPlants
    )
})()

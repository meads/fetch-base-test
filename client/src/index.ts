import { FetchBase } from "fetch-base"
import { Plant } from "../../lib/dist"

class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            ip: "localhost:8080",
            api: "plant",
            protocol: "http"
        })
    }
    postOptions(item: Plant): RequestInit {
        return this.getRequestInit("POST", JSON.stringify(item))
    }
    putOptions(item: Plant): RequestInit {
        return this.getRequestInit("PUT", JSON.stringify(item))
    }
    getOptions(): RequestInit {
        return this.getRequestInit("GET")
    }
    deleteOptions(): RequestInit {
        return this.getRequestInit("DELETE")
    }
    private getRequestInit(method: string, body?: string): RequestInit {
        return {
            body,
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
}
// <details>
//     <summary>summary</summary>
//     obj
// </details>
var show = (summary: string, obj: any) => {
    document.body.appendChild(
        document
            .createElement("details")
            .appendChild(
                document
                    .createElement("summary")
                    .appendChild(document.createTextNode(summary))
            )
            .appendChild(document.createTextNode(JSON.stringify(obj)))
    )
}
;(async function() {
    let plantService = new PlantService()
    let postResult = <Plant>(
        await plantService.post(
            new Plant("southern magnolia", "magnolia", "grandiflora")
        )
    )
    show("post result", postResult)

    let singlePlant = await plantService.single(postResult.id)
    show("single result", singlePlant)
    let tmpPlant = JSON.parse(JSON.stringify(singlePlant)) // make a copy of 'single' result
    tmpPlant.commonName = "Southern Magnolia" // change something
    let putResult = await plantService.put(tmpPlant)
    show("put result", putResult)

    let post2Result = await plantService.post(
        new Plant("banana shrub", "magnolia", "fuscata")
    )
    show("post2 result", post2Result)

    let plants = await plantService.get()
    show("get result", plants)

    let delete1Result = await plantService.delete(plants[0])
    show("delete 1 result", delete1Result)

    let delete2Result = await plantService.delete(plants[1])
    show("Here is the delete 2 result", delete2Result)

    let remainingPlants = await plantService.get()
    show(`Here is the get result after deleting entities: `, remainingPlants)
})()

import { FetchBase }  from "fetch-base"

export class Plant {
    id: number = 0
    lastUpdated: string = ""
    constructor(
        public commonName: string = "",
        public genus: string = "",
        public species: string = "",
    ){}
}

class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            ip: "localhost:8080",
            api: "plant",
            protocol: "http",
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
                "Content-Type": "application/json",
            },
        }
    }
}

(async function(){
        
    let plantService = new PlantService()
    let postResult = await plantService.post(new Plant('southern magnolia', 'magnolia', 'grandiflora'))
    console.log(`Here is the post result: `)
    console.log(postResult)

    let singlePlant = await plantService.single(1) // <- should be 1 as first id generated
    console.log(`Here is the single result: `)
    console.log(singlePlant)

    let tmpPlant = JSON.parse(JSON.stringify(singlePlant)) // make a copy of 'single' result 
    tmpPlant.commonName = "Southern Magnolia"
    let putResult = await plantService.put(tmpPlant)
    console.log(`Here is the put result: `)
    console.log(putResult)

    let post2Result = await plantService.post(new Plant("banana shrub", "magnolia", "fuscata"))
    console.log(`Here is the post 2 result: `)
    console.log(post2Result)

    let plants = await plantService.get()
    console.log(`Here is the get result: `)
    console.log(plants)

    let delete1Result = await plantService.delete(plants[0])
    console.log(`Here is the delete 1 result: `)
    console.log(delete1Result)

    let delete2Result = await plantService.delete(plants[1])
    console.log(`Here is the delete 2 result: `)
    console.log(delete2Result)
}())
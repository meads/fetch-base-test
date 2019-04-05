import { FetchBase }  from "fetch-base"

export class Plant {
    constructor(
        public id: number = 0,
        public lastUpdated: string = "",
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
        return { 
            method: "POST", 
            body: JSON.stringify(item),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
    putOptions(item: Plant): RequestInit {
        return { 
            method: "PUT", 
            body: JSON.stringify(item),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
    getOptions(): RequestInit {
        return { 
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
    deleteOptions(): RequestInit {
        return { 
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
}

(async function(){
        
    let plantService = new PlantService()
    let plant = new Plant(0, '', 'southern magnolia', 'magnolia', 'grandiflora')
    console.log(plant)
    let postResult = await plantService.post(plant)
    console.log(`Here is the post result: `)
    console.log(postResult)

    let singlePlant = await plantService.single(1) // <- should be 1 as first id generated
    console.log(`Here is the single result: `)
    console.log(singlePlant)

    singlePlant.commonName = "Southern Magnolia"
    let putResult = await plantService.put(singlePlant)
    console.log(`Here is the put result: `)
    console.log(putResult)

    let post2Result = await plantService.post( new Plant(0, '', "banana shrub", "magnolia", "fuscata"))
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
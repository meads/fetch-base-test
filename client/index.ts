import { FetchBase }  from "fetch-base"

export class Plant {
    constructor(
        public id: number = 0,
        public commonName: string = "",
        public genus: string = "",
        public species: string = "",
    ){}
}

class PlantService extends FetchBase<Plant> {
    constructor() {
        super({
            ip: "localhost:8080",
            api: "api",
            protocol: "http",
        })
    }
}

let plantService = new PlantService()

plantService.get().then((plants: Plant[]) => {
    console.log(plants)
    alert("view the console for results!")
}).catch(reason => alert(reason))

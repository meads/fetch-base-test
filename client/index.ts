import { FetchBase, IFetchBase }  from "fetch-base"

export class Plant {
    constructor(
        public commonName: string = "",
        public genus: string = "",
        public species: string = "",
    ){}
}

interface IPlantService extends IFetchBase<Plant> {}
class PlantService extends FetchBase<Plant> implements IPlantService {
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

import { FetchBase, IFetchBase }  from "fetch-base"

export class Automobile {
    constructor(
        public make: string = "",
        public model: string = "",
    ){}
}

export class Car extends Automobile {
    constructor(
        public make: string = "",
        public model: string = "",
        public hybrid: boolean = false,

    ){
        super(make, model)
    }
}

interface IFetcher extends IFetchBase<Car> {}
class Fetcher extends FetchBase<Car> implements IFetcher {
    constructor() {
        super({
            ip: "localhost:8080",
            api: "",
            protocol: "http",
        })
    }
    handleFetchResponse(response: Response) {
        return response.json()
    }
}

new Fetcher().get().then(value => {
    let carsJsonTextNode = document.createTextNode(JSON.stringify(value))
    document.body.appendChild(carsJsonTextNode)
}).catch(reason => {
    alert(reason)
})

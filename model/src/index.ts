export class Plant {
    id: number = 0
    lastUpdated: string = ""
    constructor(
        public commonName: string = "",
        public genus: string = "",
        public species: string = ""
    ) {}
}

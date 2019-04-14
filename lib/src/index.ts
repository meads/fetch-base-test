export class Plant {
    id: number = 0
    lastUpdated: string = ""
    constructor(
        public commonName: string = "",
        public genus: string = "",
        public species: string = ""
    ) {}
}
export interface ITrackableAndIdentifiable {
    id: any
    lastUpdated: string
}
export class DataRepository<T extends ITrackableAndIdentifiable> {
    data = new Map<number, T>()
    lastId = 0
    insert(item: T) {
        item.id = ++this.lastId
        item.lastUpdated = new Date().toString()
        this.data.set(this.lastId, item)
        return this.lastId
    }
    update(item: T) {
        if (!("id" in item)) {
            this.insert(item)
        }
        if (!this.data.has(item.id)) {
            return false
        }
        let el = this.data.get(item.id)
        el = JSON.parse(JSON.stringify(item))
        if (el) {
            el.lastUpdated = new Date().toString()
            this.data.set(el.id, el)
        }
        return true
    }
    find(id: number): T {
        return <T>this.data.get(id)
    }
    findAll(): Array<T> {
        return Array.from(this.data.values())
    }
    remove(id: number) {
        if (!this.data.has(id)) {
            return false
        }
        return this.data.delete(id)
    }
}
export class PlantRepository extends DataRepository<Plant> {}

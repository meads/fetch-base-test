export declare class Plant {
    commonName: string;
    genus: string;
    species: string;
    id: number;
    lastUpdated: string;
    constructor(commonName?: string, genus?: string, species?: string);
}
export interface ITrackableAndIdentifiable {
    id: any;
    lastUpdated: string;
}
export declare class DataRepository<T extends ITrackableAndIdentifiable> {
    data: Map<number, T>;
    lastId: number;
    insert(item: T): number;
    update(item: T): boolean;
    find(id: number): T;
    findAll(): Array<T>;
    remove(id: number): boolean;
}
export declare class PlantRepository extends DataRepository<Plant> {
}

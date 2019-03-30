export declare class Automobile {
    make: string;
    model: string;
    constructor(make?: string, model?: string);
}
export declare class Car extends Automobile {
    make: string;
    model: string;
    hybrid: boolean;
    constructor(make?: string, model?: string, hybrid?: boolean);
}

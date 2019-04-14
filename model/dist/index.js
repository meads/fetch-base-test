"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plant = /** @class */ (function () {
    function Plant(commonName, genus, species) {
        if (commonName === void 0) { commonName = ""; }
        if (genus === void 0) { genus = ""; }
        if (species === void 0) { species = ""; }
        this.commonName = commonName;
        this.genus = genus;
        this.species = species;
        this.id = 0;
        this.lastUpdated = "";
    }
    return Plant;
}());
exports.Plant = Plant;

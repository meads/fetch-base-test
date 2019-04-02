"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_base_1 = require("fetch-base");
var Plant = /** @class */ (function () {
    function Plant(id, commonName, genus, species) {
        if (id === void 0) { id = 0; }
        if (commonName === void 0) { commonName = ""; }
        if (genus === void 0) { genus = ""; }
        if (species === void 0) { species = ""; }
        this.id = id;
        this.commonName = commonName;
        this.genus = genus;
        this.species = species;
    }
    return Plant;
}());
exports.Plant = Plant;
var PlantService = /** @class */ (function (_super) {
    __extends(PlantService, _super);
    function PlantService() {
        return _super.call(this, {
            ip: "localhost:8080",
            api: "api",
            protocol: "http",
        }) || this;
    }
    return PlantService;
}(fetch_base_1.FetchBase));
var plantService = new PlantService();
plantService.get().then(function (plants) {
    console.log(plants);
    alert("view the console for results!");
}).catch(function (reason) { return alert(reason); });

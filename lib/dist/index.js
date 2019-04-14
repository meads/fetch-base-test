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
var DataRepository = /** @class */ (function () {
    function DataRepository() {
        this.data = new Map();
        this.lastId = 0;
    }
    DataRepository.prototype.insert = function (item) {
        item.id = ++this.lastId;
        item.lastUpdated = new Date().toString();
        this.data.set(this.lastId, item);
        return this.lastId;
    };
    DataRepository.prototype.update = function (item) {
        if (!("id" in item)) {
            this.insert(item); // not checking for duplication here so...
        }
        if (!this.data.has(item.id)) {
            return false;
        }
        var el = this.data.get(item.id);
        el = JSON.parse(JSON.stringify(item));
        if (el) {
            el.lastUpdated = new Date().toString();
            this.data.set(el.id, el);
        }
        return true;
    };
    DataRepository.prototype.find = function (id) {
        return this.data.get(id);
    };
    DataRepository.prototype.findAll = function () {
        return Array.from(this.data.values());
    };
    DataRepository.prototype.remove = function (id) {
        if (!this.data.has(id)) {
            return false;
        }
        return this.data.delete(id);
    };
    return DataRepository;
}());
exports.DataRepository = DataRepository;
var PlantRepository = /** @class */ (function (_super) {
    __extends(PlantRepository, _super);
    function PlantRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlantRepository;
}(DataRepository));
exports.PlantRepository = PlantRepository;

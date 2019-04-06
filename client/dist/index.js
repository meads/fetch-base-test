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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_base_1 = require("fetch-base");
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
var PlantService = /** @class */ (function (_super) {
    __extends(PlantService, _super);
    function PlantService() {
        return _super.call(this, {
            ip: "localhost:8080",
            api: "plant",
            protocol: "http",
        }) || this;
    }
    PlantService.prototype.postOptions = function (item) {
        return this.getRequestInit("POST", JSON.stringify(item));
    };
    PlantService.prototype.putOptions = function (item) {
        return this.getRequestInit("PUT", JSON.stringify(item));
    };
    PlantService.prototype.getOptions = function () {
        return this.getRequestInit("GET");
    };
    PlantService.prototype.deleteOptions = function () {
        return this.getRequestInit("DELETE");
    };
    PlantService.prototype.getRequestInit = function (method, body) {
        return {
            body: body,
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        };
    };
    return PlantService;
}(fetch_base_1.FetchBase));
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var plantService, postResult, singlePlant, tmpPlant, putResult, post2Result, plants, delete1Result, delete2Result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    plantService = new PlantService();
                    return [4 /*yield*/, plantService.post(new Plant('southern magnolia', 'magnolia', 'grandiflora'))];
                case 1:
                    postResult = _a.sent();
                    console.log("Here is the post result: ");
                    console.log(postResult);
                    return [4 /*yield*/, plantService.single(1)]; // <- should be 1 as first id generated
                case 2:
                    singlePlant = _a.sent() // <- should be 1 as first id generated
                    ;
                    console.log("Here is the single result: ");
                    console.log(singlePlant);
                    tmpPlant = JSON.parse(JSON.stringify(singlePlant)) // make a copy of 'single' result 
                    ;
                    tmpPlant.commonName = "Southern Magnolia";
                    return [4 /*yield*/, plantService.put(tmpPlant)];
                case 3:
                    putResult = _a.sent();
                    console.log("Here is the put result: ");
                    console.log(putResult);
                    return [4 /*yield*/, plantService.post(new Plant("banana shrub", "magnolia", "fuscata"))];
                case 4:
                    post2Result = _a.sent();
                    console.log("Here is the post 2 result: ");
                    console.log(post2Result);
                    return [4 /*yield*/, plantService.get()];
                case 5:
                    plants = _a.sent();
                    console.log("Here is the get result: ");
                    console.log(plants);
                    return [4 /*yield*/, plantService.delete(plants[0])];
                case 6:
                    delete1Result = _a.sent();
                    console.log("Here is the delete 1 result: ");
                    console.log(delete1Result);
                    return [4 /*yield*/, plantService.delete(plants[1])];
                case 7:
                    delete2Result = _a.sent();
                    console.log("Here is the delete 2 result: ");
                    console.log(delete2Result);
                    return [2 /*return*/];
            }
        });
    });
}());

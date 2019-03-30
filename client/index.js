"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_base_1 = require("fetch-base");
var Automobile = /** @class */ (function () {
    function Automobile(make, model) {
        if (make === void 0) { make = ""; }
        if (model === void 0) { model = ""; }
        this.make = make;
        this.model = model;
    }
    return Automobile;
}());
exports.Automobile = Automobile;
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(make, model, hybrid) {
        if (make === void 0) { make = ""; }
        if (model === void 0) { model = ""; }
        if (hybrid === void 0) { hybrid = false; }
        var _this = _super.call(this, make, model) || this;
        _this.make = make;
        _this.model = model;
        _this.hybrid = hybrid;
        return _this;
    }
    return Car;
}(Automobile));
exports.Car = Car;
var Fetcher = /** @class */ (function (_super) {
    __extends(Fetcher, _super);
    function Fetcher() {
        return _super.call(this, {
            ip: "localhost:8080",
            api: "",
            protocol: "http",
        }) || this;
    }
    Fetcher.prototype.handleFetchResponse = function (response) {
        return response.json();
    };
    return Fetcher;
}(fetch_base_1.FetchBase));
new Fetcher().get().then(function (value) {
    var carsJsonTextNode = document.createTextNode(JSON.stringify(value));
    document.body.appendChild(carsJsonTextNode);
}).catch(function (reason) {
    alert(reason);
});

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ShipListData_1 = require("./ShipListData");
var ShippedSale = (function () {
    function ShippedSale() {
    }
    return ShippedSale;
}());
exports.ShippedSale = ShippedSale;
var ShipListComponent = (function () {
    function ShipListComponent(shipData) {
        this.shipData = shipData;
    }
    ShipListComponent.prototype.postItem = function (event) {
        var _this = this;
        event.preventDefault();
        this.shipData.postItem(this.itemTitle, this.itemIsComplete).subscribe(function (result) { return _this.itemTitle = JSON.stringify(result); }, function (error) { console.error(error); _this.itemTitle = error; });
    };
    return ShipListComponent;
}());
ShipListComponent = __decorate([
    core_1.Component({
        selector: 'ship-list',
        templateUrl: 'shiplist/shiplist.component.html',
        styleUrls: ['shiplist/shiplist.component.css'],
        providers: [ShipListData_1.ShipListData]
    }),
    __metadata("design:paramtypes", [ShipListData_1.ShipListData])
], ShipListComponent);
exports.ShipListComponent = ShipListComponent;
//# sourceMappingURL=shiplist.component.js.map
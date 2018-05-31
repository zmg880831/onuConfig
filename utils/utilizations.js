"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexPath = /** @class */ (function () {
    function IndexPath(row, column) {
        this.row = row;
        this.column = column;
    }
    Object.defineProperty(IndexPath.prototype, "range", {
        get: function () {
            return "" + this.column + this.row;
        },
        enumerable: true,
        configurable: true
    });
    return IndexPath;
}());
exports.IndexPath = IndexPath;

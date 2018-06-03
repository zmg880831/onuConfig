"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Excel range index path helper function
var IndexPath = /** @class */ (function () {
    function IndexPath(row, column) {
        this.row = row;
        this.column = column;
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
function sequenceThrough(start, end) {
    var count = end - start + 1;
    var seq = [];
    for (var index = 0; index < count; index++) {
        seq.push(start + index);
    }
    return seq;
}
exports.sequenceThrough = sequenceThrough;
console.log("Typescript Utilization");
var indexPath = new IndexPath(3, "A");
console.log(indexPath.range);

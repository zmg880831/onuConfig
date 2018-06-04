"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Excel range index path helper function
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
function sequenceThrough(start, end) {
    var count = end - start + 1;
    var seq = [];
    for (var index = 0; index < count; index++) {
        seq.push(start + index);
    }
    return seq;
}
exports.sequenceThrough = sequenceThrough;
// onu record model
var Onu = /** @class */ (function () {
    function Onu(vlan, mac) {
        this.vlan = vlan;
        this.mac = mac;
        this.vlan = vlan;
        this.mac = mac;
    }
    return Onu;
}());
exports.Onu = Onu;
var onu1 = {
    vlan: 3007,
    mac: 'AE03-2108-37FE',
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Excel range index path helper function
class IndexPath {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
    get range() {
        return `${this.column}${this.row}`;
    }
}
exports.IndexPath = IndexPath;
function sequenceThrough(start, end) {
    let count = end - start + 1;
    let seq = [];
    for (let index = 0; index < count; index++) {
        seq.push(start + index);
    }
    return seq;
}
exports.sequenceThrough = sequenceThrough;
<<<<<<< HEAD
let onu1 = {
=======
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
>>>>>>> b6703b09d541676047d19864e977e52918a3f7cf
    vlan: 3007,
    mac: 'AE03-2108-37FE',
};

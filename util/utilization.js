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
// onu record model
class Onu {
    constructor(service, customer, ponport) {
        this.service = service;
        this.customer = customer;
        this.ponport = ponport;
        this.service = service;
        this.customer = customer;
        this.ponport = ponport;
    }
}
exports.Onu = Onu;
// let onu1: Onu = {
//     service: 'hello world',
//     mac: 'AE03-2108-37FE',
// service: '兴海组团青少年活动中心',
// frame: 0,
// board: 1,
// port: 3,
// ontId: 18,
// }

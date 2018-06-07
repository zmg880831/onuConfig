"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sequenceThrough(start, end) {
    let count = end - start + 1;
    let seq = [];
    for (let index = 0; index < count; index++) {
        seq.push(start + index);
    }
    return seq;
}
exports.sequenceThrough = sequenceThrough;
function alphabetStrideThrough(start, end) {
    let startIndex = start.charCodeAt(0);
    let endIndex = end.charCodeAt(0);
    var count = endIndex - startIndex + 1;
    let array = Array(count).fill("");
    let mapped = array.map((v, i) => {
        return String.fromCharCode(i + startIndex);
    });
    return mapped;
}
exports.alphabetStrideThrough = alphabetStrideThrough;
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

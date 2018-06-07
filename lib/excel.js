"use strict";
// Excel range index path helper function
Object.defineProperty(exports, "__esModule", { value: true });
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
function readCell(workSheet, indexPath) {
    let cellIndex = indexPath.range;
    let cell = workSheet[cellIndex];
    if (cell != undefined) {
        return cell.v;
    }
    return `${cellIndex} is empty!`;
}
exports.readCell = readCell;

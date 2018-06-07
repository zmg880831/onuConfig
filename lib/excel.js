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

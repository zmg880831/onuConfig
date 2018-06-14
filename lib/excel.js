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
    return cell != undefined ? String(cell.v) : undefined;
}
exports.readCell = readCell;
function match(workSheet, column, criteria) {
    let row = 1;
    let isMatched = false;
    do {
        let cellContent = readCell(workSheet, new IndexPath(row, column));
        let matchedArray = cellContent.match(criteria);
        if (matchedArray != null) {
            isMatched = true;
        }
        else {
            row += 1;
        }
    } while (row < 5000 && isMatched == false);
    return isMatched ? row : -1;
}
exports.match = match;
function fetchItems(workSheet, row, columnTitles) {
    let columnArray = columnTitles.entries();
    let itemArray = Array.from(columnArray).map((entry) => {
        let column = entry[1];
        let cellContent = readCell(workSheet, new IndexPath(row, column));
        let itemEntry = [entry[0], cellContent];
        return itemEntry;
    });
    let itemMap = new Map(itemArray);
    return itemMap;
}
exports.fetchItems = fetchItems;

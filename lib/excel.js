"use strict";
// Excel range index path helper function
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const utilization_1 = require("../util/utilization");
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
        //@ts-ignore
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
    return new Map(itemArray);
}
exports.fetchItems = fetchItems;
function fetchOnt(workBook, sheetName, row, column) {
    let sheet = workBook.Sheets[sheetName];
    // read interface
    let interfaceString = readCell(sheet, new IndexPath(row, column.onuInterface));
    if (interfaceString == undefined) {
        return undefined;
    }
    let onuInterfaces = model_1.convertOnu(interfaceString);
    if (onuInterfaces == undefined) {
        return undefined;
    }
    // read vlan
    let vlan = 0;
    let vlanString = readCell(sheet, new IndexPath(row, column.vlan));
    if (vlanString != undefined) {
        if (!isNaN(Number(vlanString))) {
            vlan = Number(vlanString);
        }
    }
    // read description
    let description = readCell(sheet, new IndexPath(row, column.description));
    if (description == undefined) {
        return undefined;
    }
    // read customer
    let customer = readCell(sheet, new IndexPath(row, column.customer));
    if (customer == undefined) {
        return undefined;
    }
    // read mac
    let mac = readCell(sheet, new IndexPath(row, column.mac));
    if (mac != undefined && utilization_1.isMacAddress(mac)) {
        mac = utilization_1.formatMacAddress(mac);
    }
    else {
        mac = 'none';
    }
    // read pon access mode
    let access = readCell(sheet, new IndexPath(row, column.access));
    if (access != undefined && /[EG]PON/.test(access)) {
        access = access;
    }
    else {
        access = 'format error';
    }
    // read fiber
    let fiber = readCell(sheet, new IndexPath(row, column.fiber));
    let odf = readCell(sheet, new IndexPath(row, column.odf));
    let splitter1 = readCell(sheet, new IndexPath(row, column.splitter1));
    let splitter2 = readCell(sheet, new IndexPath(row, column.splitter2));
    return {
        olt: sheetName,
        board: onuInterfaces.board,
        port: onuInterfaces.port,
        onuid: onuInterfaces.onuid,
        vlan: vlan,
        description: description,
        customer: customer,
        mac: mac,
        serial: undefined,
        access: access,
        fiber: fiber,
        odf: odf,
        splitter1: splitter1,
        splitter2: splitter2,
    };
}
exports.fetchOnt = fetchOnt;
function fetchOnts(workBook, sheetName, column) {
    let onts = utilization_1.sequenceThrough(2, 30).map((row) => {
        return fetchOnt(workBook, sheetName, row, column);
    });
    let filtered = onts.filter((ont) => {
        return ont != undefined;
    });
    //@ts-ignore
    return filtered;
}
exports.fetchOnts = fetchOnts;
function allSheets(workBook) {
    let workSheetNames = workBook.SheetNames;
    return workSheetNames.map((sheetName) => {
        return workBook.Sheets[sheetName];
    });
}
exports.allSheets = allSheets;

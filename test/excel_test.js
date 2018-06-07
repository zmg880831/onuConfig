"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
let testWorkBook = xlsx_1.readFile('./data/pon.xls');
let testWorkSheetName = testWorkBook.SheetNames[0];
console.log(testWorkSheetName);
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName];
let rowRange = utilization_1.sequenceThrough(1, 5);
let columnRange = utilization_1.alphabetStrideThrough('A', 'E');
for (const row of rowRange) {
    for (const column of columnRange) {
        let indexPath = new excel_1.IndexPath(row, column);
        let testCellContent = excel_1.readCell(testWorkSheet, indexPath);
        console.log(indexPath.range, testCellContent);
    }
}

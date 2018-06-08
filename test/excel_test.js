"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
let testWorkBook = xlsx_1.readFile('./data/pon.xls');
let testWorkSheetName = testWorkBook.SheetNames[0];
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName];
//------ test function match ----------
// console.log("test function match start")
let matchRow = excel_1.match(testWorkSheet, "A", /交警红绿灯/);
console.log(`row ${matchRow} match`);
// console.log("test function match end")
//------ test function match ----------
//------ test readCell ----------
// let rowRange = sequenceThrough(1, 5)
// let columnRange = alphabetStrideThrough('A', 'E')
// for (const row of rowRange) {
//     for (const column of columnRange) {
//         let indexPath = new IndexPath(row, column)
//         let testCellContent = readCell(testWorkSheet, indexPath)
//         console.log(indexPath.range, testCellContent)
//     }
// }
//------ test readCell ----------

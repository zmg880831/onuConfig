"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
let testWorkBook = xlsx_1.readFile('./data/pon.xls');
let testWorkSheetName = testWorkBook.SheetNames[1];
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName];
let monitorColumnTitle = {
    onuInterface: 'B',
    vlan: 'E',
    description: 'D',
    customer: 'C',
    mac: 'J',
    serial: 'J',
    access: 'A',
    fiber: 'G',
    odf: 'H',
    splitter1: 'F',
    splitter2: 'I',
};
let fetchedOnt = excel_1.fetchOnt(testWorkBook, testWorkSheetName, 3, monitorColumnTitle);
if (fetchedOnt != undefined) {
    console.log(fetchedOnt);
}
else {
    console.log("ont data is not completed!");
}
//------ test function match ----------
// console.log("test function match start")
// let matchRow = match(testWorkSheet, "A", /交警红绿灯/)
// console.log(`row ${matchRow} match`)
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
//<<<<<< test function fetchItems <<<<<<<<<<
// let titles = new Map([
//     ['客户名称', 'A'],
//     ['VLAN', 'B'],
//     ['IP网关', 'C'],
//     ['ONU模板', 'D'],
//     ['联系方式', 'F']
// ])
// // let rowMatched = match(testWorkSheet, "A", /交警红绿灯/)
// let rowMatched = match(testWorkSheet, "A", /瓯海公安局村居监控汇聚-郭溪所/)
// let items = fetchItems(testWorkSheet, rowMatched, titles)
// items.forEach((v, k) => {
//     console.log(k, ':', v)
// })
//>>>>>> test function fetchItems >>>>>>>>>>

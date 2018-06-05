"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
const utilization_1 = require("./util/utilization");
let wifiWorkBook = xlsx_1.readFile('./excels/集团客户业务汇总-18-0601.xls');
let testSheetName = '三廊桥';
let testSheet = wifiWorkBook.Sheets[testSheetName];
console.log(testSheet);
function readCell(workSheet, indexPath) {
    let cellIndex = indexPath.range;
    let cell = workSheet[cellIndex];
    if (cell != undefined) {
        return cell.v;
    }
    return `no value at index path: ${cellIndex}`;
}
const columnAlphabets = new Map([
    ['service', "C"],
    ['customer', "D"]
]);
function readOnuRecord(workSheet, row) {
    let keys = Array.from(columnAlphabets.keys());
    // @ts-ignore
    let indexPaths = new Map(keys.map((key) => {
        let columnAlphabet = columnAlphabets.get(key);
        if (columnAlphabet == undefined) {
            console.log('${key} column not found');
            columnAlphabet = '';
        }
        return [key, new utilization_1.IndexPath(row, columnAlphabet)];
    }));
    for (const key of indexPaths.keys()) {
        // @ts-ignore
        // console.log(`${key} :  ${indexPaths.get(key).range}`)
    }
    let customer = readCell(workSheet, indexPaths.get('customer'));
    let service = readCell(workSheet, indexPaths.get('service'));
    let onu = new utilization_1.Onu(service, customer);
    return onu;
}
for (const row of utilization_1.sequenceThrough(1, 100)) {
    let testOnu = readOnuRecord(testSheet, row);
    if (testOnu.customer != "龙湾公安校园卫士") {
        console.log(testOnu);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
const utilization_1 = require("./util/utilization");
const excel_1 = require("./lib/excel");
let wifiWorkBook = xlsx_1.readFile('./excels/集团客户业务汇总-18-0601.xls');
let testSheetName = '三廊桥';
let testSheet = wifiWorkBook.Sheets[testSheetName];
console.log(testSheet);
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
        return [key, new excel_1.IndexPath(row, columnAlphabet)];
    }));
    for (const key of indexPaths.keys()) {
        // @ts-ignore
        // console.log(`${key} :  ${indexPaths.get(key).range}`)
    }
    let customer = excel_1.readCell(workSheet, indexPaths.get('customer'));
    let service = excel_1.readCell(workSheet, indexPaths.get('service'));
    //@ts-ignore
    let onu = new utilization_1.Onu(service, customer, "0/0/0_12");
    return onu;
}
for (const row of utilization_1.sequenceThrough(1, 100)) {
    let testOnu = readOnuRecord(testSheet, row);
    if (testOnu.customer != "龙湾公安校园卫士") {
        console.log(testOnu);
    }
}

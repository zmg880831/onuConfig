"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
let wifiWorkBook = xlsx_1.readFile('./pon.xls');
let wifiSheetNames = wifiWorkBook.SheetNames;
for (const sheetName of wifiSheetNames) {
    console.log(sheetName);
}
let guangdianSheetName = wifiSheetNames[1];
let guangdianSheet = wifiWorkBook.Sheets[guangdianSheetName];
console.log(guangdianSheet);

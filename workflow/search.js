"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
let searchOptions = {
    rootPath: './data',
    match: {
        column: "A",
        criteria: /龙湾公安WLAN/
    },
    columnTitles: {
        VLAN: 'B',
        联系方式: 'F'
    }
};
console.log('搜索参数:');
console.log(searchOptions);
let searchResult = {
    file: '',
    sheet: '',
    row: -1,
};
// @ts-ignore
let columnTitles = new Map(Object.entries(searchOptions.columnTitles));
// columnTitles.forEach((v, k) => {
//     console.log(k, ":", v)
// })
let filePaths = fs_1.default.readdir(searchOptions.rootPath, (err, files) => {
    for (const file of files) {
        let excelPath = path_1.default.join(searchOptions.rootPath, file);
        let testWorkBook = xlsx_1.readFile(excelPath);
        let testWorkSheetNames = testWorkBook.SheetNames;
        for (const sheetName of testWorkSheetNames) {
            let workSheet = testWorkBook.Sheets[sheetName];
            let rowMatched = excel_1.match(workSheet, searchOptions.match.column, searchOptions.match.criteria);
            if (rowMatched != -1) {
                searchResult.file = file;
                searchResult.sheet = sheetName;
                searchResult.row = rowMatched;
                console.log(searchResult.file);
                console.log(searchResult.sheet);
                console.log(searchResult.row);
                let items = excel_1.fetchItems(workSheet, rowMatched, columnTitles);
                items.forEach((v, k) => {
                    console.log(k, ':', v);
                });
                console.log("---------");
            }
        }
    }
});

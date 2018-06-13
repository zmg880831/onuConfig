"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const py = require('pinyin');
// search matched row and fetch desired column
//@ts-ignore
//@ts-ignore
function matchFetch(options) {
    let workbook = xlsx_1.readFile(options.filePath);
    let sheets = excel_1.allSheets(workbook);
    let results = sheets.map((sheet, index) => {
        let rowMatched = excel_1.match(sheet, options.match.column, options.match.criteria);
        if (rowMatched != -1) {
            return {
                matchedSheet: sheet,
                sheetName: workbook.SheetNames[index],
                row: rowMatched
            };
        }
        else {
            return undefined;
        }
    });
    let matchedResults = results.filter((r) => {
        return r != undefined;
    });
    let matched = matchedResults[0];
    if (matched != undefined) {
        let items = excel_1.fetchItems(matched.matchedSheet, matched.row, 
        //@ts-ignore
        new Map(options.columnTitles));
        items.set('site', matched.sheetName);
        return items;
    }
    else {
        return undefined;
    }
}
// work flow 
let serviceName = /GA8东明路-株浦路路口/;
let str = String(serviceName);
console.log(str);
let converted = py(str, {
    style: py.STYLE_TONE2,
}).join("");
console.log(converted);
// let summaryTableOption = {
//     filePath: './excels/workflow_1/集团客户业务汇总-18-0611.xls',
//     match: {
//         column: "D",
//         criteria: /djifij/
//     },
//     columnTitles: [
//         ['VLAN', 'E'],
//         ['Pon', 'B']
//     ]
// }
// summaryTableOption.match.criteria = serviceName
// let summary = matchFetch(summaryTableOption);
// if (summary != undefined) {
//     prettyLog(summary)
// }
// // 获取 MAC 地址
// let macOption = {
//     filePath: './excels/workflow_1/东明路点位迁改-新送一路信号.xlsx',
//     match: {
//         column: "D",
//         criteria: /dji/
//     },
//     columnTitles: [
//         ['MAC', 'J']
//     ]
// }
// macOption.match.criteria = serviceName
// let mac = matchFetch(macOption);
// if (mac != undefined) {
//     prettyLog(mac)
// }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
// search matched row and fetch desired column
//@ts-ignore
//@ts-ignore
function matchFetch(options) {
    let workbook = xlsx_1.readFile(summaryTableOption.filePath);
    let sheets = excel_1.allSheets(workbook);
    let results = sheets.map((sheet, index) => {
        let rowMatched = excel_1.match(sheet, summaryTableOption.match.column, summaryTableOption.match.criteria);
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
        new Map(summaryTableOption.columnTitles));
        items.set('site', matched.sheetName);
        return items;
    }
    else {
        return undefined;
    }
}
//
let summaryTableOption = {
    filePath: './excels/workflow_1/集团客户业务汇总-18-0611.xls',
    match: {
        column: "D",
        criteria: /温州中油冶金加油站有限公司/
    },
    columnTitles: [
        ['VLAN', 'E'],
        ['Pon', 'B']
    ]
};
let summary = matchFetch(summaryTableOption);
if (summary != undefined) {
    utilization_1.prettyLog(summary);
}

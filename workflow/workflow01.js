"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
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
    if (matchedResults.length == 0) {
        console.log(options.filePath);
        console.log(String(options.match.criteria) + " 找不到");
    }
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
// let serviceName = /GA8东明路-株浦路路口/
let serviceName = /东殴王庙-广场/;
let servicePinYin = py(String(serviceName), {
    style: py.STYLE_TONE2,
}).join("");
let summaryTableOption = {
    filePath: './excels/workflow_1/集团客户业务汇总-18-0611.xls',
    match: {
        column: "D",
        criteria: /djifij/
    },
    columnTitles: [
        ['VLAN', 'E'],
        ['Pon', 'B']
    ]
};
summaryTableOption.match.criteria = serviceName;
let summary = matchFetch(summaryTableOption);
if (summary != undefined) {
    utilization_1.prettyLog(summary);
}
// 获取 MAC 地址
let macOption = {
    filePath: './excels/workflow_1/东明路点位迁改-新送一路信号.xlsx',
    match: {
        column: "D",
        criteria: /dji/
    },
    columnTitles: [
        ['MAC', 'J']
    ]
};
macOption.match.criteria = serviceName;
let mac = matchFetch(macOption);
if (mac != undefined) {
    utilization_1.prettyLog(mac);
}
//@ts-ignore
let interfaces = utilization_1.onuInterface(summary.get('Pon'));
let config = utilization_1.onuConfigCommand({
    board: interfaces.board,
    port: interfaces.port,
    ontid: interfaces.onuid,
    //@ts-ignore
    mac: mac.get('Mac'),
    pinyin: servicePinYin,
    //@ts-ignore
    vlan: summary.get('VLAN')
});
console.log(config);

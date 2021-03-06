import fs from 'fs'
import path from 'path'
import { allSheets, IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough, prettyLog, onuConfigCommand, onuInterface } from '../util/utilization'
const py = require('pinyin')



// search matched row and fetch desired column
//@ts-ignore
//@ts-ignore
function matchFetch(options) {
    let workbook = readFile(options.filePath);
    let sheets = allSheets(workbook);
    let results = sheets.map((sheet, index) => {
        let rowMatched = match(sheet, options.match.column, options.match.criteria);
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
            console.log(options.filePath)
            console.log(String(options.match.criteria) + " 找不到")
    }
    let matched = matchedResults[0];
    if (matched != undefined) {
        let items = fetchItems(
            matched.matchedSheet,
            matched.row,
            //@ts-ignore
            new Map(options.columnTitles)
        );
        items.set('site', matched.sheetName)
        return items
    } else {
        return undefined
    }
}



// work flow 

// let serviceName = /GA8东明路-株浦路路口/
let serviceName = /东殴王庙-广场/

let servicePinYin = py(
    String(serviceName),
    {
        style: py.STYLE_TONE2,
    }
).join("")


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
}
summaryTableOption.match.criteria = serviceName

let summary = matchFetch(summaryTableOption);
if (summary != undefined) {
    prettyLog(summary)
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
}

macOption.match.criteria = serviceName


let mac = matchFetch(macOption);
if (mac != undefined) {
    prettyLog(mac)
}

//@ts-ignore
let interfaces = onuInterface(summary.get('Pon'))

let config = onuConfigCommand({
    board: interfaces.board,
    port: interfaces.port,
    ontid: interfaces.onuid,
    //@ts-ignore
    mac: mac.get('Mac'),
    pinyin: servicePinYin,
    //@ts-ignore
    vlan: summary.get('VLAN')
})
console.log(config)
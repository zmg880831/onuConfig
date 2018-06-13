import fs from 'fs'
import path from 'path'
import { allSheets, IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough, prettyLog } from '../util/utilization'




// search matched row and fetch desired column
//@ts-ignore
//@ts-ignore
function matchFetch(options) {
    let workbook = readFile(summaryTableOption.filePath);
    let sheets = allSheets(workbook);
    let results = sheets.map((sheet, index) => {
        let rowMatched = match(sheet, summaryTableOption.match.column, summaryTableOption.match.criteria);
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
        let items = fetchItems(
            matched.matchedSheet, 
            matched.row,
            //@ts-ignore
            new Map(summaryTableOption.columnTitles)
        );
        items.set('site', matched.sheetName)
        return items
    } else {
        return undefined
    }
}



//
let summaryTableOption = {
    filePath: './excels/workflow_1/集团客户业务汇总-18-0611.xls',
    match: {
        column: "D",
        criteria: /温州市二幼大门旁/
    },
    columnTitles: [
        ['VLAN', 'E'],
        ['Pon', 'B']
    ]
}
let summary = matchFetch(summaryTableOption);
if (summary != undefined) {
    prettyLog(summary)
}

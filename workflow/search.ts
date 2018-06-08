import fs from 'fs'
import path from 'path'
import { IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough } from '../util/utilization'


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
}
console.log('搜索参数:')
console.log(searchOptions)

let searchResult = {
    file: '',
    sheet: '',
    row: -1,
}


// @ts-ignore
let columnTitles: Map<string, string> = new Map(Object.entries(searchOptions.columnTitles))
// columnTitles.forEach((v, k) => {
//     console.log(k, ":", v)
// })
let filePaths = fs.readdir(searchOptions.rootPath, (err, files) => {
    for (const file of files) {
        let excelPath = path.join(searchOptions.rootPath, file)
        let testWorkBook = readFile(excelPath)
        let testWorkSheetNames = testWorkBook.SheetNames
        for (const sheetName of testWorkSheetNames) {
            let workSheet = testWorkBook.Sheets[sheetName]
            let rowMatched = match(workSheet, searchOptions.match.column, searchOptions.match.criteria)
            if (rowMatched != -1) {
                searchResult.file = file
                searchResult.sheet = sheetName
                searchResult.row = rowMatched
                console.log(searchResult.file )
                console.log(searchResult.sheet )
                console.log(searchResult.row )
                let items = fetchItems(workSheet, rowMatched, columnTitles)
                items.forEach((v, k) => {
                    console.log(k, ':', v)
                })
                console.log("---------")
            }
        }
    }
})
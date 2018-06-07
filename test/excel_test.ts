import { IndexPath, readCell } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough } from '../util/utilization'

let testWorkBook = readFile('./data/pon.xls')
let testWorkSheetName = testWorkBook.SheetNames[0]
console.log(testWorkSheetName)
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName]

let rowRange = sequenceThrough(1, 5)
let columnRange = alphabetStrideThrough('A', 'E')

for (const row of rowRange) {
    for (const column of columnRange) {
        let indexPath = new IndexPath(row, column)
        let testCellContent = readCell(testWorkSheet, indexPath)
        console.log(indexPath.range, testCellContent)
    }
}

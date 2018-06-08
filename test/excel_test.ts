import { IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough } from '../util/utilization'

let testWorkBook = readFile('./data/pon.xls')
let testWorkSheetName = testWorkBook.SheetNames[0]
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName]


//------ test function match ----------
// console.log("test function match start")

// let matchRow = match(testWorkSheet, "A", /交警红绿灯/)
// console.log(`row ${matchRow} match`)

// console.log("test function match end")

//------ test function match ----------





//------ test readCell ----------

// let rowRange = sequenceThrough(1, 5)
// let columnRange = alphabetStrideThrough('A', 'E')
// for (const row of rowRange) {
//     for (const column of columnRange) {
//         let indexPath = new IndexPath(row, column)
//         let testCellContent = readCell(testWorkSheet, indexPath)
//         console.log(indexPath.range, testCellContent)
//     }
// }

//------ test readCell ----------






//<<<<<< test function fetchItems <<<<<<<<<<

let titles = new Map([
    ['客户名称', 'A'],
    ['VLAN', 'B'],
    ['IP网关', 'C'],
    ['ONU模板', 'D'],
    ['联系方式', 'F']
])
let items = fetchItems(testWorkSheet, 3, titles)
items.forEach((v, k) => {
    console.log(k, ':', v)
})

//>>>>>> test function fetchItems >>>>>>>>>>
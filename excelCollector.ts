import { readFile, WorkSheet } from "xlsx";
import { Onu, sequenceThrough } from "./util/utilization"
import { IndexPath } from './lib/excel'

let wifiWorkBook = readFile('./excels/集团客户业务汇总-18-0601.xls')


let testSheetName = '三廊桥'
let testSheet = wifiWorkBook.Sheets[testSheetName]
console.log(testSheet)


function readCell(workSheet: WorkSheet, indexPath: IndexPath) {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    if (cell != undefined) {
        return cell.v
    }
    return `no value at index path: ${cellIndex}`
}


const columnAlphabets = new Map([
    ['service', "C"],
    ['customer', "D"]
])

function readOnuRecord(workSheet: WorkSheet, row: number) {
    let keys = Array.from(columnAlphabets.keys())
    // @ts-ignore
    let indexPaths = new Map(keys.map((key) => {
        let columnAlphabet = columnAlphabets.get(key)
        if (columnAlphabet == undefined) {
            console.log('${key} column not found')
            columnAlphabet = ''
        }
        return [key, new IndexPath(row, columnAlphabet)]
    }))
    for (const key of indexPaths.keys()) {
        // @ts-ignore
        // console.log(`${key} :  ${indexPaths.get(key).range}`)
    }
    let customer = readCell(workSheet, indexPaths.get('customer'))
    let service = readCell(workSheet, indexPaths.get('service'))
    let onu = new Onu(service, customer, "0/0/0_12")
    return onu
}


for (const row of sequenceThrough(1, 100)) {
    let testOnu = readOnuRecord(testSheet, row)
    if (testOnu.customer != "龙湾公安校园卫士") {
        console.log(testOnu)
    }
}
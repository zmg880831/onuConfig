// playground javascript
//@ts-check
//@ts-ignore
const XLSX = require('xlsx')
//@ts-ignore
const IndexPath = require('./utils/utilizations').IndexPath

// generating alphabet array
/**
 * 
 * @param {string} start 
 * @param {string} end 
 */
function alphabetArray(start, end) {
    let startIndex = start.charCodeAt(0)
    let endIndex = end.charCodeAt(0)
    var count = endIndex - startIndex + 1
    let array = Array(count).fill("")

    let mapped = array.map((v, i) => {
        return String.fromCharCode(i + startIndex)
    })
    return mapped
}

// generating alphabet array
/**
 * 
 * @param {number} start 
 * @param {number} end 
 */
function numberRange(start, end) {
    var count = end - start + 1
    let array = Array(count).fill(0)

    let mapped = array.map((_, i) => {
        return i + start
    })
    return mapped
}

/**
 * 
 * @param {string} onu 
 */
function onuInterface(onu) {
    let [ports, onuid] = onu.split("_")
    let [frame, board, port] = ports.split("/")
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
    }
}




var workbook = XLSX.readFile('./wifi.xls')

var sheetName = workbook.SheetNames[3]
// console.log(sheetName)

var workSheet = workbook.Sheets["景山2"]

// read a line 
const columnPonType = "A"
const columnPort = "B"

/**
 * 
 * @param {workSheet} workSheet 
 */
function readCell(workSheet, indexPath) {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    if (cell != undefined) {
        return cell.v
    }
    return "no value here"
}

console.log(sheetName)
for (const row of numberRange(300, 320)) {
    let value = readCell(workSheet, new IndexPath(row, "B"))
    let onuInfo = onuInterface(value)
    console.log(row, onuInfo.board, onuInfo.port, onuInfo.onuid)
    console.log(`service port add ${onuInfo.board} ${onuInfo.board} onuid ${onuInfo.onuid} transparent`)
}




// for (const row of numberArray(1, 5)) {
//     console.log(`row ${row}: `)
//     for (const column of alphabetArray("A", "C")) {
//         let range = new IndexPath(row, column).range
//         console.log(workSheet[range].v)       
//     }
//     console.log("        ")
// }
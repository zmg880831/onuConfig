// playground javascript
//@ts-check
//@ts-ignore
const XLSX = require('xlsx')
//@ts-ignore
const IndexPath = require('./utils/indexPath')

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

function numberArray(start, end) {
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
    let [ports, onuid]= onu.split("_")
    let [frame, board, port] = ports.split("/")
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
    }
}

let onuInfo = onuInterface("0/1/6_8")
console.log(onuInfo)



var workbook = XLSX.readFile('./service.xlsx')

var sheetName = workbook.SheetNames[0]
// console.log(sheetName)

var workSheet = workbook.Sheets[sheetName]

// for (const row of numberArray(1, 5)) {
//     console.log(`row ${row}: `)
//     for (const column of alphabetArray("A", "C")) {
//         let range = new IndexPath(row, column).range
//         console.log(workSheet[range].v)       
//     }
//     console.log("        ")
// }


// playground javascript

const XLSX = require('xlsx')

var workbook = XLSX.readFile('./service.xlsx')

var sheetName = workbook.SheetNames[0]
console.log(sheetName)

var workSheet = workbook.Sheets[sheetName]

for (const cell in workSheet) {
    console.log(cell)
}
// playground javascript
//@ts-check
//@ts-ignore
const XLSX = require('xlsx')
//@ts-ignore
const IndexPath = require('./utils/indexPath')

var workbook = XLSX.readFile('./service.xlsx')

var sheetName = workbook.SheetNames[0]
console.log(sheetName)

var workSheet = workbook.Sheets[sheetName]


var indexPath = new IndexPath(1, "C")
console.log(indexPath)
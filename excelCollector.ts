import { readFile } from "xlsx";

let wifiWorkBook = readFile('./pon.xls')

let wifiSheetNames = wifiWorkBook.SheetNames

for (const sheetName of wifiSheetNames) {
    console.log(sheetName)
}

let guangdianSheetName = wifiSheetNames[1]
let guangdianSheet = wifiWorkBook.Sheets[guangdianSheetName]
console.log(guangdianSheet)
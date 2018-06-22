
import { IndexPath, readCell, match, fetchItems, fetchOnt, fetchOnts } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough } from '../util/utilization'
import { OntColumn } from '../lib/model'
//@ts-ignore
const mysql = require('mysql')

let testWorkBook = readFile('./data/pon.xls')
let testWorkSheetName = testWorkBook.SheetNames[1]
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName]


let monitorColumnTitle: OntColumn = {
    onuInterface: 'B',
    vlan: 'E',
    description: 'D',
    customer: 'C',
    mac: 'J',
    serial: 'J',
    access: 'A',
    fiber: 'G',
    odf: 'H',
    splitter1: 'F',
    splitter2: 'I',
}


let fetchedOnts = fetchOnts(testWorkBook, testWorkSheetName, monitorColumnTitle)

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'optics'
})
console.log(connection)
//@ts-ignore:w
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// fetchedOnts.forEach((ont, index) => {
//     console.log(`---------------- ${index + 1} -----------------`)
//     for (const key in ont) {
//         if (ont.hasOwnProperty(key)) {
//             //@ts-ignore
//             const element = ont[key];
//             console.log(`${key} : ${element}`)
//         }
//     }
// });

fetchedOnts.forEach(ont => {
    let insertQuery = `insert into optical_terminal ( olt, board, port, onuid, description, customer, mac, serial, vlan, access, fiber, odf, splitter1, splitter2) select "${ont.olt}", "${ont.board}", "${ont.port}", "${ont.onuid}", "${ont.description}", "${ont.customer}", "${ont.mac}", "${ont.serial}", "${ont.vlan}", "${ont.access}", "${ont.fiber}", "${ont.odf}", "${ont.splitter1}", "${ont.splitter2}" where not exists ( select * from optical_terminal where olt = "${ont.olt}" and board = ${ont.board} and port = ${ont.port} and onuid = ${ont.onuid}); `
    console.log(insertQuery)
    //@ts-ignore
    connection.query(insertQuery, (err, rows, fields) => {
        if (err) {
            console.log(err)
        }
    })
})

// let showAllQuery = 'select * from optical_terminal'
// //@ts-ignore
// connection.query(showAllQuery, (err, rows, fields) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(rows)
// })
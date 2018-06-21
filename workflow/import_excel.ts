import { IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough, onuInterface, prettyLog } from '../util/utilization'
import { prependListener } from 'cluster';


//@ts-ignore
const mysql = require('mysql')



let titles = new Map([
    ['pon_type', 'A'],
    ['pon_interface', 'B'],
    ['customer_name', 'C'],
    ['service_name', 'D'],
    ['vlan', 'E'],
    ['splitter', 'F'],
    ['fiber_tail', 'G'],
    ['odf_number', 'H'],
    ['second_splitter', 'I'],
    ['mac', 'J'],
])

let summaryBook = readFile('./excels/集团客户业务汇总-18-0611.xls')

console.log('try to connect to database onu info')
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '56880707',
    database: 'onu_infomation'
})

const insertString = 'INSERT INTO ont (pon_type, customer_name, service_name, vlan, splitter, fiber_tail, odf_number, second_splitter, mac, board, port, ont_id, olt_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

summaryBook.SheetNames.slice(10, 20).forEach((sheetName) => {
    console.log(sheetName)
    let sheet = summaryBook.Sheets[sheetName]
    sequenceThrough(2, 3000).forEach((row) => {
        console.log(row)

        let items = fetchItems(sheet, row, titles)
        if (items.get('pon_interface') != undefined) {
            let interfaceString = items.get('pon_interface')
            items.delete('pon_interface')
            let interfaces = onuInterface(interfaceString)
            items.set('board', interfaces.board)
            items.set('port', interfaces.port)
            items.set('onuid', interfaces.onuid)
            items.set('olt_name', sheetName)
            let onuToWrite = Array.from(items.values())
            // @ts-ignore
            connection.query(insertString, onuToWrite, (err, rows, fields) => {
                if (err) {
                    console.log(err)
                }
            })
        } else {
            console.log("interface not available")
        }

    })
})




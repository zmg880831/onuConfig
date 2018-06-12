import { IndexPath, readCell, match, fetchItems } from '../lib/excel'
import { readFile, WorkSheet } from "xlsx";
import { sequenceThrough, alphabetStrideThrough, onuInterface } from '../util/utilization'


//@ts-ignore
const mysql = require('mysql')




let testWorkBook = readFile('./excels/VLAN汇总.xls')
let testWorkSheetName = testWorkBook.SheetNames[0]
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName]

let titles = new Map([
    ['机房', 'A'],
    ['业务', 'C'],
    ['VLAN', 'B']
])



// console.log('try to connect to database onu info')
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '56880707',
    database: 'onu_infomation'
})


// const showAllString = 'SELECT * FROM ont'


const insertString = 'INSERT INTO vlan (service, site, vlan) VALUES (?, ?, ?)'

let rowRange = sequenceThrough(1, 100)
rowRange.forEach((row) => {
    console.log(`-------------row ${row} start------------------`)
    let items = fetchItems(testWorkSheet, row, titles)
    let isComplete = true
    for (const value of items.values()) {
        if (value == undefined) {
            isComplete = false
        }
    }

    let vlanToWrite = [
        items.get('业务'),
        items.get('机房'),
        items.get('VLAN')
    ]

    console.log(vlanToWrite)
    // check vlan cell is number
    let vlanIsNumber = true
    let vlanString = items.get('VLAN')
    if (vlanString != undefined) {
        vlanIsNumber = !isNaN(parseInt(vlanString))
        if (!vlanIsNumber) {
            console.log(vlanString, "is not a number")
        }
    }

    if (isComplete && vlanIsNumber) {

        console.log("√√√√√√√√√√√√  资料完整  √√√√√√√√√√√√")
        //@ts-ignore
        connection.query(insertString, vlanToWrite, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
        })
    } else {
        console.log("××××××××××××  资料错误  ××××××××××××")
    }

    console.log(`-------------row ${row} end------------------`)

})
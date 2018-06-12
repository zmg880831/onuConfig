"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
//@ts-ignore
const mysql = require('mysql');
let testWorkBook = xlsx_1.readFile('./excels/VLAN汇总.xls');
let testWorkSheetName = testWorkBook.SheetNames[0];
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName];
let titles = new Map([
    ['机房', 'A'],
    ['业务', 'C'],
    ['VLAN', 'B']
]);
console.log('try to connect to database onu info');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '56880707',
    database: 'onu_infomation'
});
// const showAllString = 'SELECT * FROM ont'
const insertString = 'INSERT INTO vlan (service, site, vlan) VALUES (?, ?, ?)';
let rowRange = utilization_1.sequenceThrough(2, 10);
rowRange.forEach((row) => {
    let items = excel_1.fetchItems(testWorkSheet, row, titles);
    if (items != undefined) {
        let vlanToWrite = [
            items.get('业务'),
            items.get('机房'),
            items.get('VLAN')
        ];
        //@ts-ignore
        // connection.query(insertString, vlanToWrite, (err, rows, fields) => {
        //     if (err) {
        //         console.log(err)
        //     }
        // })
    }
    else {
        console.log(row, '行 资料不全');
    }
});

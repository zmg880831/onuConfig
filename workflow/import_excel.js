"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../lib/excel");
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
//@ts-ignore
const mysql = require('mysql');
let testWorkBook = xlsx_1.readFile('./excels/service.xlsx');
let testWorkSheetName = testWorkBook.SheetNames[0];
let testWorkSheet = testWorkBook.Sheets[testWorkSheetName];
let titles = new Map([
    ['pon', 'A'],
    ['service', 'C'],
    ['customer', 'B']
]);
let items = excel_1.fetchItems(testWorkSheet, 10, titles);
//@ts-ignore
let interfaces = utilization_1.onuInterface(items.get('pon'));
items.forEach((v, k) => {
    console.log(k, ':', v);
});
console.log(interfaces.onuid);
console.log('try to connect to database onu info');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '56880707',
    database: 'onu_infomation'
});
for (const key in connection) {
    if (connection.hasOwnProperty(key)) {
        const element = connection[key];
        console.log(key, element);
    }
}
console.log(connection);
// const showAllString = 'SELECT * FROM ont'
// const insertString = 'INSERT INTO ont (service_name, customer_name, board, port, ont_id) VALUES (?, ?, ?, ?, ?)'
// let onuToWrite = [
//     items.get('service'),
//     items.get('customer'),
//     interfaces.board,
//     interfaces.port,
//     interfaces.onuid
// ]
// //@ts-ignore
// connection.query(insertString, onuToWrite, (err, rows, fields) => {
//     if (err) {
//         console.log(err)
//     }
// })

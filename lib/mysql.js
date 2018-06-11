"use strict";
//@ts-ignore
const mysql = require('mysql');
console.log('try to connect to database onu info');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '56880707',
    database: 'onu_infomation'
});
const queryString = 'SELECT * FROM ont';
//@ts-ignore
connection.query(queryString, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    //@ts-ignore
    let onts = rows.map((row) => {
        return {
            点位: row.service_name,
            port: row.port,
        };
    });
});

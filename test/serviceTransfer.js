"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
const utilization_1 = require("../util/utilization");
const excel_1 = require("../lib/excel");
// @ts-ignore
const Telnet = require('telnet-client');
let wifiWorkBook = xlsx_1.readFile('./excels/集团客户业务汇总-18-0605.xls');
let testSheetName = '东信';
let testSheet = wifiWorkBook.Sheets[testSheetName];
console.log(testSheet);
function readCell(workSheet, indexPath) {
    let cellIndex = indexPath.range;
    let cell = workSheet[cellIndex];
    if (cell != undefined) {
        return cell.v;
    }
    return `no value at index path: ${cellIndex}`;
}
function onuInterface(onu) {
    let [ports, onuid] = onu.split("_");
    let [frame, board, port] = ports.split("/");
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
    };
}
const columnAlphabets = new Map([
    ['service', "D"],
    ['customer', "C"],
    ['ponport', "B"]
]);
function readOnuRecord(workSheet, row) {
    let keys = Array.from(columnAlphabets.keys());
    // @ts-ignore
    let indexPaths = new Map(keys.map((key) => {
        let columnAlphabet = columnAlphabets.get(key);
        if (columnAlphabet == undefined) {
            console.log('${key} column not found');
            columnAlphabet = '';
        }
        return [key, new excel_1.IndexPath(row, columnAlphabet)];
    }));
    for (const key of indexPaths.keys()) {
        // @ts-ignore
        // console.log(`${key} :  ${indexPaths.get(key).range}`)
    }
    let customer = readCell(workSheet, indexPaths.get('customer'));
    let service = readCell(workSheet, indexPaths.get('service'));
    let ponport = readCell(workSheet, indexPaths.get('ponport'));
    let onu = new utilization_1.Onu(service, customer, ponport);
    return onu;
}
let targetOnu;
for (const row of utilization_1.sequenceThrough(1, 1000)) {
    let testOnu = readOnuRecord(testSheet, row);
    // refactor to regex
    if (testOnu.service == "GA8曼哈顿1幢-篮球场边") {
        console.log(testOnu);
        let onuPortInfo = onuInterface(testOnu.ponport);
        console.log(onuPortInfo);
        targetOnu = testOnu;
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection = new Telnet();
        let params = {
            host: '10.254.56.58',
            port: 23,
            loginPrompt: /User name:/,
            passwordPrompt: /User password:/,
            shellPrompt: /5683/,
            username: 'root',
            password: 'wzcatv908',
            timeout: 1500
        };
        let cnct = yield connection.connect(params);
        console.log(cnct);
        let res = yield connection.exec('display current\n');
    });
}
run();

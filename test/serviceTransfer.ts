import { readFile, WorkSheet } from "xlsx";
import { IndexPath, Onu, sequenceThrough } from "../util/utilization"
// @ts-ignore
const Telnet = require('telnet-client')

let wifiWorkBook = readFile('./excels/集团客户业务汇总-18-0605.xls')


let testSheetName = '东信'
let testSheet = wifiWorkBook.Sheets[testSheetName]
console.log(testSheet)


function readCell(workSheet: WorkSheet, indexPath: IndexPath) {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    if (cell != undefined) {
        return cell.v
    }
    return `no value at index path: ${cellIndex}`
}

function onuInterface(onu: string) {
    let [ports, onuid] = onu.split("_")
    let [frame, board, port] = ports.split("/")
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
    }
}

const columnAlphabets = new Map([
    ['service', "D"],
    ['customer', "C"],
    ['ponport', "B"]
])

function readOnuRecord(workSheet: WorkSheet, row: number) {
    let keys = Array.from(columnAlphabets.keys())
    // @ts-ignore
    let indexPaths = new Map(keys.map((key) => {
        let columnAlphabet = columnAlphabets.get(key)
        if (columnAlphabet == undefined) {
            console.log('${key} column not found')
            columnAlphabet = ''
        }
        return [key, new IndexPath(row, columnAlphabet)]
    }))
    for (const key of indexPaths.keys()) {
        // @ts-ignore
        // console.log(`${key} :  ${indexPaths.get(key).range}`)
    }
    let customer = readCell(workSheet, indexPaths.get('customer'))
    let service = readCell(workSheet, indexPaths.get('service'))
    let ponport = readCell(workSheet, indexPaths.get('ponport'))
    let onu = new Onu(service, customer, ponport)
    return onu
}

let targetOnu: Onu
for (const row of sequenceThrough(1, 1000)) {
    let testOnu = readOnuRecord(testSheet, row)
    // refactor to regex
    if (testOnu.service == "GA8曼哈顿1幢-篮球场边") {
        console.log(testOnu)
        let onuPortInfo = onuInterface(testOnu.ponport)
        console.log(onuPortInfo)
        targetOnu = testOnu
    }
}


async function run() {
  let connection = new Telnet()

  let params = {
    host: '10.254.56.58',
    port: 23,
    loginPrompt: /User name:/,
    passwordPrompt: /User password:/,
    shellPrompt: /5683/,
    username: 'root',
    password: 'wzcatv908',
    timeout: 1500
  }

  let cnct = await connection.connect(params)
  console.log(cnct)

  let res = await connection.exec('display current\n')
}

run()

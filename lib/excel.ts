
// Excel range index path helper function

import { WorkSheet, WorkBook } from "xlsx";
import { OntColumn, Ont, OnuInterface, convertOnu } from "./model"
import { onuInterface, isMacAddress, formatMacAddress, sequenceThrough } from "../util/utilization";

export class IndexPath {
    row: number
    column: string
    constructor(row: number, column: string) {
        this.row = row
        this.column = column
    }
    get range(): string {
        return `${this.column}${this.row}`
    }
}


export function readCell(workSheet: WorkSheet, indexPath: IndexPath): string | undefined {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    return cell != undefined ? String(cell.v) : undefined
}

export function match(workSheet: WorkSheet, column: string, criteria: RegExp): number {
    let row = 1
    let isMatched = false
    do {
        let cellContent = readCell(workSheet, new IndexPath(row, column))
        //@ts-ignore
        let matchedArray = cellContent.match(criteria)
        if (matchedArray != null) {
            isMatched = true
        } else {
            row += 1
        }
    } while (row < 5000 && isMatched == false);
    return isMatched ? row : -1
}



export function fetchItems(workSheet: WorkSheet, row: number, columnTitles: Map<string, string>): Map<string, string | undefined> {
    let columnArray = columnTitles.entries()
    let itemArray = Array.from(columnArray).map((entry) => {
        let column = entry[1]
        let cellContent = readCell(workSheet, new IndexPath(row, column))
        let itemEntry: [string, string | undefined] = [entry[0], cellContent]
        return itemEntry
    })
    return new Map(itemArray)
}

export function fetchOnt(workBook: WorkBook, sheetName: string, row: number, column: OntColumn): Ont | undefined {

    let sheet = workBook.Sheets[sheetName]
    // read interface
    let interfaceString = readCell(sheet, new IndexPath(row, column.onuInterface))
    if (interfaceString == undefined) {
        return undefined
    }
    let onuInterfaces = convertOnu(interfaceString)
    if (onuInterfaces == undefined) {
        return undefined
    }
    // read vlan
    let vlan = 0
    let vlanString = readCell(sheet, new IndexPath(row, column.vlan))
    if (vlanString != undefined) {
        if (!isNaN(Number(vlanString))) {
            vlan = Number(vlanString)
        }
    }
    // read description
    let description = readCell(sheet, new IndexPath(row, column.description))
    if (description == undefined) { return undefined }
    // read customer
    let customer = readCell(sheet, new IndexPath(row, column.customer))
    if (customer == undefined) { return undefined }
    // read mac
    let mac = readCell(sheet, new IndexPath(row, column.mac))
    if (mac != undefined && isMacAddress(mac)) {
        mac = formatMacAddress(mac)
    } else {
        mac = 'none'
    }
    // read pon access mode
    let access = readCell(sheet, new IndexPath(row, column.access))
    if (access != undefined && /[EG]PON/.test(access)) {
        access = access
    } else {
        access = 'format error'
    }
    // read fiber
    let fiber = readCell(sheet, new IndexPath(row, column.fiber))
    let odf = readCell(sheet, new IndexPath(row, column.odf))
    let splitter1 = readCell(sheet, new IndexPath(row, column.splitter1))
    let splitter2 = readCell(sheet, new IndexPath(row, column.splitter2))
    return {
        olt: sheetName,
        board: onuInterfaces.board,
        port: onuInterfaces.port,
        onuid: onuInterfaces.onuid,
        vlan: vlan,
        description: description,
        customer: customer,
        mac: mac,
        serial: undefined,
        access: access,
        fiber: fiber,
        odf: odf,
        splitter1: splitter1,
        splitter2: splitter2,
    }
}


export function fetchOnts(workBook: WorkBook, sheetName: string, column: OntColumn): Ont[] {
    let onts = sequenceThrough(2, 3000).map((row) => {
        return fetchOnt(workBook, sheetName, row, column)
    })
    let filtered = onts.filter((ont) => {
        return ont != undefined
    })
    //@ts-ignore
    return filtered
}

export function allSheets(workBook: WorkBook): WorkSheet[] {
    let workSheetNames = workBook.SheetNames
    return workSheetNames.map((sheetName) => {
        return workBook.Sheets[sheetName]
    })
}
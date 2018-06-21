
// Excel range index path helper function

import { WorkSheet, WorkBook } from "xlsx";
import { OntColumn, Ont, OnuInterface, convertOnu} from "./model"
import { onuInterface } from "../util/utilization";

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
    let interfaceString = readCell(sheet, new IndexPath(row, column.onuInterface))
    if (interfaceString == undefined) {
        return undefined
    }
    let onuInterfaces = convertOnu(interfaceString) 
    if (onuInterfaces == undefined) {
        return undefined
    }

    return {
        olt: sheetName,
        board: onuInterfaces.board,
        port: onuInterfaces.port,
        onuid: onuInterfaces.onuid,
        vlan: 0,
        description: '',
        customer: '',
        mac: '',
        serial: '',
        access: '',
        fiber: '',
        odf: '',
        splitter1: '',
        splitter2: '',
    }
}

export function allSheets(workBook: WorkBook): WorkSheet[] {
    let workSheetNames = workBook.SheetNames
    return workSheetNames.map((sheetName) => {
        return workBook.Sheets[sheetName]
    })
}
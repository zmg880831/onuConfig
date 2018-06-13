
// Excel range index path helper function

import { WorkSheet, WorkBook } from "xlsx";

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


export function readCell(workSheet: WorkSheet, indexPath: IndexPath): string {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    if (cell != undefined) {
        return String(cell.v)
    }
    return `${cellIndex} is empty!`
}

export function match(workSheet: WorkSheet, column: string, criteria: RegExp): number {
    let row = 1
    let isMatched = false
    do {
        let cellContent = readCell(workSheet, new IndexPath(row, column))
        let matchedArray = cellContent.match(criteria)
        if (matchedArray != null) {
            isMatched = true
        } else {
            row += 1
        }
    } while (row < 100 && isMatched == false);
    return isMatched ? row : -1
}



export function fetchItems(workSheet: WorkSheet, row: number, columnTitles: Map<string, string>): Map<string, string> {
    let columnArray = columnTitles.entries()
    let itemArray = Array.from(columnArray).map((entry) => {
        let column = entry[1]
        let cellContent = readCell(workSheet, new IndexPath(row, column))
        let itemEntry: [string, string] = [entry[0], cellContent]
        return itemEntry
    })
    return new Map(itemArray)
}


export function allSheets(workBook: WorkBook): WorkSheet[] {
    let workSheetNames = workBook.SheetNames
    return workSheetNames.map((sheetName) => {
        return workBook.Sheets[sheetName]
    })
}
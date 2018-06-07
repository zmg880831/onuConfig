
// Excel range index path helper function

import { WorkSheet } from "xlsx";

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


export function readCell(workSheet: WorkSheet, indexPath: IndexPath) {
    let cellIndex = indexPath.range
    let cell = workSheet[cellIndex]
    if (cell != undefined) {
        return cell.v
    }
    return `${cellIndex} is empty!` 
}
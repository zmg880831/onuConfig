// Excel range index path helper function
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

export function sequenceThrough(start: number, end: number): number[] {
    let count = end - start + 1
    let seq: number[] = []
    for (let index = 0; index < count; index++) {
        seq.push(start + index)       
    }
    return seq
}
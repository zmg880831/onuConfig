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

// onu record model
interface Onu {
    vlan: number,
    mac: string,
    service: String,
    frame: number,
    board: number,
    port: number,
    ontId: number,
}

let onu1: Onu = {
    vlan: 3007,
    mac: 'AE03-2108-37FE',
    service: '兴海组团青少年活动中心',
    frame: 0,
    board: 1,
    port: 3,
    ontId: 18,
}

console.log(onu1)
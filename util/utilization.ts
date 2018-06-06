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
export class Onu {
    constructor(
        public service: string,
        public customer: string,
        public ponport: string
    ) {
        this.service = service
        this.customer = customer
        this.ponport = ponport
    }
}

// let onu1: Onu = {
//     service: 'hello world',
//     mac: 'AE03-2108-37FE',
    // service: '兴海组团青少年活动中心',
    // frame: 0,
    // board: 1,
    // port: 3,
    // ontId: 18,
// }

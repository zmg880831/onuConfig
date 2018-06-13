
export function sequenceThrough(start: number, end: number): number[] {
    let count = end - start + 1
    let seq: number[] = []
    for (let index = 0; index < count; index++) {
        seq.push(start + index)       
    }
    return seq
}


export function alphabetStrideThrough(start: string, end: string): string[] {
    let startIndex = start.charCodeAt(0)
    let endIndex = end.charCodeAt(0)
    var count = endIndex - startIndex + 1
    let array = Array(count).fill("")

    let mapped = array.map((v, i) => {
        return String.fromCharCode(i + startIndex)
    })
    return mapped
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

export function prettyLog(map: Map<string, string>) {
    map.forEach((v, k) => {
        console.log(`${k} : ${v}`)
    })
}
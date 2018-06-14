
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
<<<<<<< HEAD
export function onuInterface(onu: string): {frame: number, board: number, port: number, onuid: number } {
    let [ports, onuid] = onu.split("_")
    let [frame, board, port] = ports.split("/")
    return {
        frame: Number(frame),
        board: Number(board),
        port: Number(port),
        onuid: Number(onuid),
=======

export function prettyLog(map: Map<string, string>) {
    map.forEach((v, k) => {
        console.log(`${k} : ${v}`)
    })
}

export function onuConfigCommand(options: {}) {
//@ts-ignore
    return `int epon 0/${options.board}

    ont add ${options.port} ${options.ontid} mac-auth ${options.mac} oam ont-lineprofile-id 2 ont-srvprofile-id 2 desc ${options.pinyin}
    
    ont port native-vlan ${options.port} ${options.ontid} eth 3 vlan ${options.vlan}
    ont port native-vlan ${options.port} ${options.ontid} eth 4 vlan ${options.vlan}
    quit
    
    service-port vlan ${options.vlan} epon 0/${options.board}/${options.port} ont ${options.ontid} multi-service user-vlan ${options.vlan} tag-transform translate 
    
    `
}


export function onuInterface(onu: string) {
    let [ports, onuid] = onu.split("_")
    let [frame, board, port] = ports.split("/")
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
>>>>>>> master
    }
}
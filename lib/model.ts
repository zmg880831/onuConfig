export interface Ont {
    olt: string,
    board: number,
    port: number, 
    onuid: number,
    vlan?: number,
    description: string, 
    customer: string, 
    mac?: string,
    serial?: string,
    access?: string,
    fiber?: string,
    odf?: string,
    splitter1?: string,
    splitter2?: string,
}


export interface OntColumn {
    onuInterface: string,
    vlan: string,
    description: string, 
    customer: string, 
    mac: string,
    serial: string,
    access: string,
    fiber: string,
    odf: string,
    splitter1: string,
    splitter2: string,
}

export interface OnuInterface {
    board: number,
    port: number,
    onuid: number,
}

export function convertOnu(onuInterface: string): OnuInterface | undefined {
    let [ports, onuid] = onuInterface.split("_")
    let [frame, board, port] = ports.split("/")
    for (const str of [board, port, onuid]) {
        if (isNaN(Number(str))) {
            return undefined
        }
    }
    return {
        board: Number(board),
        port: Number(port),
        onuid: Number(onuid),
    }
}
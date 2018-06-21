"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sequenceThrough(start, end) {
    let count = end - start + 1;
    let seq = [];
    for (let index = 0; index < count; index++) {
        seq.push(start + index);
    }
    return seq;
}
exports.sequenceThrough = sequenceThrough;
function alphabetStrideThrough(start, end) {
    let startIndex = start.charCodeAt(0);
    let endIndex = end.charCodeAt(0);
    var count = endIndex - startIndex + 1;
    let array = Array(count).fill("");
    let mapped = array.map((v, i) => {
        return String.fromCharCode(i + startIndex);
    });
    return mapped;
}
exports.alphabetStrideThrough = alphabetStrideThrough;
// onu record model
class Onu {
    constructor(service, customer, ponport) {
        this.service = service;
        this.customer = customer;
        this.ponport = ponport;
        this.service = service;
        this.customer = customer;
        this.ponport = ponport;
    }
}
exports.Onu = Onu;
// let onu1: Onu = {
//     service: 'hello world',
//     mac: 'AE03-2108-37FE',
// service: '兴海组团青少年活动中心',
// frame: 0,
// board: 1,
// port: 3,
// ontId: 18,
// }
function prettyLog(map) {
    map.forEach((v, k) => {
        console.log(`${k} : ${v}`);
    });
}
exports.prettyLog = prettyLog;
function onuConfigCommand(options) {
    //@ts-ignore
    return `int epon 0/${options.board}

    ont add ${options.port} ${options.ontid} mac-auth ${options.mac} oam ont-lineprofile-id 2 ont-srvprofile-id 2 desc ${options.pinyin}
    
    ont port native-vlan ${options.port} ${options.ontid} eth 3 vlan ${options.vlan}
    ont port native-vlan ${options.port} ${options.ontid} eth 4 vlan ${options.vlan}
    quit
    
    service-port vlan ${options.vlan} epon 0/${options.board}/${options.port} ont ${options.ontid} multi-service user-vlan ${options.vlan} tag-transform translate 
    
    `;
}
exports.onuConfigCommand = onuConfigCommand;
function onuInterface(onu) {
    let [ports, onuid] = onu.split("_");
    let [frame, board, port] = ports.split("/");
    return {
        frame: frame,
        board: board,
        port: port,
        onuid: onuid,
    };
}
exports.onuInterface = onuInterface;

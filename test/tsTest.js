"use strict";
// const toIntImported = require('../utilsTS/InfoConversion')
// let converted = toIntImported.toInt("hehe")
// console.log(converted)
//----------------------------------------------------
// const IndexPath = require('../utilsTS/utilizations').IndexPath
// let path = new IndexPath(5, "A")
// let cellRange = path.range
// console.log(path)
// console.log(cellRange)
//-------------------------------------------------------
// @ts-ignore
// const seq = require('../util/utilization').sequenceThrough
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// let s = seq(1, 5)
// for (const i of s) {
//     console.log(i)
// }
// console.log(s)
//--------------------pin yin------------------
// import pinyin from 'pinyin'
// let converted = pinyin(
//     "中国",
//     {
//         style: pinyin.STYLE_TONE2,
//     }
// ).join("-")
// console.log(converted)
// let s = new Map()
// s.set("vlan", 3003)
// s.set("mac", "ACE9-9889-A9C1")
// console.log(s.get("vlan"))
// for (const key of s.keys()) {
//     console.log(key, s.get(key))
// }
// let a: number = 0
// a = s.get('vlan')
// console.log(a)
const Telnet = require('telnet-client');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection = new Telnet();
        let params = {
            host: '10.254.56.6',
            port: 23,
            loginPrompt: /User name:/,
            passwordPrompt: /User password:/,
            shellPrompt: /WZCATV/,
            username: 'wzcatv',
            password: 'wzcatv703',
            timeout: 1500
        };
        console.log("fucking test");
        let cnct = yield connection.connect(params);
        let res = yield connection.exec('enable\n');
        console.log(res);
        // await connection.exec('display version\n')
        // let version = await connection.exec('\n')
        // console.log(version)
        yield connection.exec('display ont info 0 1 2 8\n');
        let ontInfomation = yield connection.exec('\n');
        console.log(ontInfomation);
    });
}
run();

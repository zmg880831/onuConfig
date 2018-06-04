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

// let s = seq(1, 5)
// for (const i of s) {
//     console.log(i)
// }
// console.log(s)


import pinyin from 'pinyin'

let converted = pinyin(
    "中国",
    {
        style: pinyin.STYLE_TONE2,
    }
).join("-")
console.log(converted)
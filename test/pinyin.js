var pinyin = require('pinyin')

let hanzi = '兴海组团青少年活动中心'
let converted = pinyin(hanzi)
let string = converted.join("-")
console.log(hanzi)
console.log(string)

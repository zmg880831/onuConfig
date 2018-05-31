var pinyin = require('pinyin')

let hanzi = '兴海组团青少年活动中心'
let converted = pinyin(hanzi, {
    style: pinyin.STYLE_TONE2,
})
let string = converted.join('_')
console.log(hanzi)
console.log(string)
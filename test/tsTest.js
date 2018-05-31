// const toIntImported = require('../utilsTS/InfoConversion')

// let converted = toIntImported.toInt("hehe")
// console.log(converted)

const IndexPath = require('../utilsTS/utilizations').IndexPath

let path = new IndexPath(5, "A")
let cellRange = path.range
console.log(path)
console.log(cellRange)
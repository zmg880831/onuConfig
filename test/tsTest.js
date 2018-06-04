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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let s = seq(1, 5)
// for (const i of s) {
//     console.log(i)
// }
// console.log(s)
var pinyin_1 = __importDefault(require("pinyin"));
var converted = pinyin_1.default("中国", {
    style: pinyin_1.default.STYLE_TONE2,
}).join("-");
console.log(converted);

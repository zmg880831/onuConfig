"use strict";
function map(mapped, callback) {
    for (const [key, value] of mapped) {
        mapped.set(key, callback(value));
    }
    return mapped;
}
function prettyLog(map) {
    map.forEach((v, k) => {
        console.log(`${k} : ${v}`);
    });
}
let m = new Map([
    ['hello', 'world'],
    ['oh', 'my']
]);
let o = map(m, (s) => {
    return `<${s}>`;
});
prettyLog(o);

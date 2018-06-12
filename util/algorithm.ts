function map<T extends Map<string, string>>(mapped: T, callback: (origin: string) => string): T {
    for (const [key, value] of mapped) {
        mapped.set(key, callback(value))
    }
    return mapped
}


function prettyLog(map: Map<string, string>) {
    map.forEach((v, k) => {
        console.log(`${k} : ${v}`)
    })
}

let m = new Map([
    ['hello', 'world'],
    ['oh', 'my']
]);

let o = map(m, (s) => {
    return `<${s}>`
})

prettyLog(o)

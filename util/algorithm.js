"use strict";
function map(mapped, callback) {
    for (const [key, value] of mapped) {
        mapped.set(key, callback(value));
    }
    return mapped;
}

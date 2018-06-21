"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertOnu(onuInterface) {
    let [ports, onuid] = onuInterface.split("_");
    let [frame, board, port] = ports.split("/");
    for (const str of [board, port, onuid]) {
        if (isNaN(Number(str))) {
            return undefined;
        }
    }
    return {
        board: Number(board),
        port: Number(port),
        onuid: Number(onuid),
    };
}
exports.convertOnu = convertOnu;

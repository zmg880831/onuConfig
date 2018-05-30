//@ts-check
export class IndexPath {
    /**
     * 
     * @param {number} row 
     * @param {string} column 
     */
    constructor(row, column) {
        this.row = row
        this.column = column
    }

    range() {
        return `${this.column}${this.row}`
    }
}

var path = new IndexPath(1, "B")
console.log(path.range())
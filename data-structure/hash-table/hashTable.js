/*// 첫 번째
function hash(key, arrayLen) {
    let total = 0;
    for (let char of key) {
        // map "a" to 1, "b" to 2, "c" to 3, etc.
        let value = char.charCodeAt(0) - 96;
        total = (total + value) % arrayLen;
    }
    return total;
}

// 좀 더 개선
function hashImprove(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100), i++) {
        let char = key[i];
        let value = char.charCodeAt(0) - 96;
        total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
}*/

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let WEIRD_PRIM = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIM + value) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) this.keyMap[index] = [];
        this.keyMap[index].push([key, value]);
        return index;
    }

    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let item of this.keyMap[index]) {
                if (item[0] === key) return item[1];
            }
        }
        return undefined;
    }

    keys() {
        let result = [];
        if (this.keyMap.length > 0) {
            for (let item of this.keyMap) {
                if (item) {
                    for (let i = 0; i < item.length; i++) {
                        // 같은 키가 존재해버리면 걸러야 한다.
                        if (!result.includes(item[i][0])) {
                            result.push(item[i][0]);
                        }
                    }
                }
            }
        }
        return result;
    }

    values() {
        let result = [];
        if (this.keyMap.length > 0) {
            for (let item of this.keyMap) {
                if (item) {
                    for (let i = 0; i < item.length; i++) {
                        // 같은 값이 존재해버리면 걸러야 한다.
                        if (!result.includes(item[i][1])) {
                            result.push(item[i][1]);
                        }
                    }
                }
            }
        }
        return result;
    }
}

let hs = new HashTable();
console.log(hs.set('maroon', '#123456'));
console.log(hs.set('blue', '#123456'));
console.log(hs.set('blue', '#123456'));
console.log(hs.set('bue', '#123456'));
console.log(hs.set('yellow', '#654321'));
console.log(hs.set('yllow', '#654321'));
console.log(hs.keys());
console.log(hs.values());

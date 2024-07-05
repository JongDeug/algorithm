import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 사이클 게임을 진행하는데 몇 번째 차례에서 사이클이 완성되는지 반환하는 함수를 구현하시오.

// 입력: N(정점 개수, 번호는 0 ~ N-1), M(차례 수), arr(차례에 대한 정보)
// 출력: int(사이클이 없으면 0, 있으면 사이클이 처음으로 완성된 차례 수)

// 핵심
// 1. union - find 문제
// 2. 사이클을 어떻게 판단할지 ?? => union 에서 판별하면됨

// [문제 세분화]
let [first, ...edges] = input;
let [n, m] = first.split(" ").map(Number);
let disjoint = Array.from({ length: n }, (_, i) => i);

function solution() {
    // M. find
    function find(x) {
        if (x !== disjoint[x]) {
            disjoint[x] = find(disjoint[x]); // I. 경로 압축
        }
        return disjoint[x];
    }

    // M. union
    function union(v, w) {
        let rootV = find(v);
        let rootW = find(w);
        if (rootV !== rootW) {
            disjoint[rootW] = rootV;
            return false;
        }
        return true;
    }

    // I. 메인 로직
    for (const [index, edge] of Object.entries(edges)) {
        let [v, w] = edge.split(" ").map(Number);
        if (union(v, w)) return Number(index) + 1;
    }
    return 0;
}

console.log(solution());

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 네트워크를 연결하는데 필요한 최소 비용을 구하는 함수를 구현해라.

// 입력: N(컴퓨터 수), M(간선 수), arr(간선 내용)
// 출력: int (최소 비용)

// 핵심
// 1. 최소비용 => MST, 크루스칼 알고리즘 사용
// 2. 사이클 판단을 위한 union - find

// [문제 세분화하기]
function parseInput(input) {
    let [n, m, ...edges] = input;
    n = Number(n);
    edges = edges.map(x => x.split(" ").map(Number));
    // I. 비용에 따라 오름 차순 정렬
    edges.sort((a, b) => a[2] - b[2]);
    return { n, edges };
}

function solution() {
    let ans = 0;

    // M. union
    function union(a, b) {
        let rootA = find(a);
        let rootB = find(b);
        if (rootA !== rootB) {
            edgeArr[rootB] = rootA;
            return true; // I. 사이클이 아니면 true 통과
        }
        return false; // I. 사이클이면 false 거부
    }

    // M. find
    function find(x) {
        if (x !== edgeArr[x]) {
            edgeArr[x] = find(edgeArr[x]); // I. 경로 최적화
        }
        return edgeArr[x];
    }

    // I. main logic
    const { n, edges } = parseInput(input);
    let edgeArr = Array.from({ length: n + 1 }, (_, i) => i);
    edges.forEach(edge => {
        let [a, b, wt] = edge;
        // I. 사이클이 아니면
        if (union(a, b)) {
            ans += wt;
        }
    });

    return ans;
}

console.log(solution());
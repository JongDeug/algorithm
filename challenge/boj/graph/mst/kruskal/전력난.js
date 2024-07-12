import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 도시의 모든 두 집(가로등) 쌍을 연결하는데 필요한 최소 비용을 구하고 아낀 비용을 반환하는 함수를 구현해라.

// 입력: 테스트케이스 여러개 임, m(집의 수), n(길의 수), arr(x,y,wt)
// 출력: int(아낀 비용)

// 핵심
// 1. kruskal 알고리즘
// 2. implement union-find to check cycle

// [문제 세분화]
function parseInput(input, num) {
    let [...edges] = input.splice(0, num);
    edges = edges.map(x => x.split(" ").map(Number));
    // I. 오름차순 정렬
    edges.sort((a, b) => a[2] - b[2]);
    return edges;
}


function solution() {
    let ans = [];

    // M. union
    const union = (x, y, edgeArr) => {
        let rootX = find(x, edgeArr);
        let rootY = find(y, edgeArr);
        if (rootX !== rootY) {
            edgeArr[rootY] = rootX;
            return true;
        }
        return false; // 사이클이 만들어지면 false
    };

    // M. find
    const find = (x, edgeArr) => {
        if (x !== edgeArr[x]) {
            edgeArr[x] = find(edgeArr[x], edgeArr);
        }
        return edgeArr[x];
    };

    // I. main logic
    while (true) {
        let [m, n] = input.splice(0, 1).toString().split(" ").map(Number);
        let edgeArr = Array.from({ length: m + 1 }, (_, i) => i);
        // I. 종료 조건
        if (!n && !m) break;

        // I. 로직 시작
        let edges = parseInput(input, n);
        let cost = 0;
        let totalCost = 0;
        edges.forEach(edge => {
            let [x, y, wt] = edge;

            if (union(x, y, edgeArr)) {
                cost += wt;
            }
            totalCost += wt;
        });
        ans.push(totalCost - cost);
    }

    return ans.join("\n");
}

console.log(solution());
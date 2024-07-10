import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 그래프가 주어 졌을 때 MST(Minimum Spanning Tree) 최소 스패닝 트리를 구하고 그 가중치의 합을 구하는 프로그램을 구현해라.

// 입력 : V(정점 개수), E(간선 개수), arr(u, v, weight)
// 출력: int(가중치 합)

// 핵심
// 1. Kruskal 알고리즘으로 구현해본다.
// 2. union - find 를 활용한다.

// [문제 세분화]
function parseInput(input) {
    let [first, ...edges] = input;
    let [V, E] = first.split(" ").map(Number);
    edges = edges.map(x => x.split(" ").map(Number));
    edges.sort((a, b) => a[2] - b[2]); // I. 가중치를 기준으로 오름차순으로 정렬한다.

    return { V, E, edges };
}

function solution() {
    let { V, E, edges } = parseInput(input);
    // I. union - find 연결 내용 담기
    let arr = Array.from({ length: V + 1 }, (_, i) => i);
    // I. 가중치
    let ans = 0;

    // M. union
    const union = (a, b) => {
        let rootA = find(a);
        let rootB = find(b);
        if (rootA !== rootB) {
            arr[rootB] = rootA;
        }
    };

    // M. find
    const find = (x) => {
        if (x !== arr[x]) {
            arr[x] = find(arr[x]);
        }
        return arr[x];
    };

    edges.forEach(edge => {
        let [u, v, wt] = edge;

        // I. 메인 로직
        // I. find 를 통해 사이클 판단 => union 안에 직접 넣어도 됨
        if (find(u) !== find(v)) {
            union(u, v);
            ans += wt; // I. 가중치
            // console.log(u, v) // I. 연결된 정점
        }
    });

    return ans;
}

console.log(solution());
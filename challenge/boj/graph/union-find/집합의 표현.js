import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");
// I. 앞으로 (EACCES) 에러가 뜬다면 적극 활용하자!!
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n");

// [문제 이해하기]
// 두 원소가 같은 집합에 포함되어 있는지 확인하는 함수를 구현해라.

// 입력: n(n+1개의 집합), m(입력으로 주어지는 연산의 개수)
// 출력: 1에 대한 yes or no

// 핵심
// 1. union - find 연산을 직접 구현하는 것

// [문제 세분화]
let [first, ...operation] = input;
let [n, m] = first.split(" ").map(Number);
let graph = Array.from({ length: n + 1 }, (_, i) => i);

function solution() {
    let ans = [];
    // M. union
    const union = (a, b) => {
        let rootA = find(a);
        let rootB = find(b);
        graph[rootB] = rootA;
    };

    // M. find
    const find = (x) => {
        if (x !== graph[x]) {
            graph[x] = find(graph[x]); // I. 경로 압축을 위해 사용하는 로직
        }
        return graph[x];
        // if (x === graph[x]) return x; // I. 이거는 경로 압축하지 않음
        // find(graph[x]);
    };

    // I. operation 순서대로 ㄱㄱ
    operation.forEach(o => {
        let [num, a, b] = o.split(" ").map(Number);

        if (num === 0) {
            union(a, b);
        } else {
            if (find(a) === find(b)) ans.push("YES");
            else ans.push("NO");
        }
    });

    return ans.join("\n");
}

console.log(solution());
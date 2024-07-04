import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 모든 학생을 친구로 만들 수 있다면 친구로 만드는데 드는 최소 비용을 구한다. 그렇지 않으면 "Oh no"를 출력한다.

// 입력: N(친구수), M(친구 관계), k(가지고 있는 돈), A(각 친구비), B(친구 관계, 같은 친구 관계가 여러번 주어질 수도 있음)
// 출력: int(모든 학생을 친구로 만드는데 드는 최소 비용)

// 핵심
// union 시 : 대표는 친구비가 제일 적은 놈으로
// find 시 : 경로 압축 대표 쪽으로 ㄱㄱ

// [문제 세분화]
let [first, second, ...relationships] = input;
let [n, m, k] = first.split(" ").map(Number);
let costsForRelationship = second.split(" ").map(Number);
let arr = Array.from({ length: n + 1 }, (_, i) => i);

function solution() {
    let ans = [];

    // M. union 함수
    const union = (v, w) => {
        let rootV = find(v);
        let rootW = find(w);
        // I. 여기서 최소 비용 비교
        if (costsForRelationship[rootV - 1] < costsForRelationship[rootW - 1]) {
            arr[rootW] = rootV;
        } else {
            arr[rootV] = rootW;
        }
    };

    // M. find 함수
    const find = (x) => {
        if (x !== arr[x]) {
            arr[x] = find(arr[x]); // I. 경로 압축
        }
        return arr[x];
    };

    // I. 친구 관계에 따라 집합 만들어주기
    relationships.forEach(relationship => {
        let [v, w] = relationship.split(" ").map(Number);
        union(v, w);
    });

    // I. 만들어진 집합을 돌면서 친구를 만들 수 있는지 확인
    for (let i = 1; i <= n; i++) {
        ans.push(find(i)); // **************************** I. 경로 압축이 마지막에 되지 않았을 수도 있겠다는 생각
    }
    let rmDuplicate = Array.from(new Set(ans));

    let sum = 0;
    rmDuplicate.forEach(item => {
        // I. 최소 비용 구하기
        sum += costsForRelationship[item - 1];
    });

    return sum <= k ? sum : "Oh no";
}

console.log(solution());
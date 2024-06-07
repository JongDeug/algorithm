import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 돌다리와 시작점을 줬을 때 영우가 밟을 수 있는 돌의 개수를 구해라.

// 입력: n(돌 개수), arr(돌마다 점핑할 수 있는 거리), s(시작점)
// 출력: int(밟을 수 있는 돌의 개수)

// 조건
// 1. 왼쪽, 오른쪽으로 점핑 가능(한 칸씩 점핑하는게 아님)
// 2. 재귀로 풀면됨
// 3. 방문했던 곳은 check 로 해결하자.

// [문제 세분화]
let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let s = Number(input[2]);

function solution(n, arr, s) {
    // M. 배열 index 범위 check 함수
    const arrangeIdx = (idx) => {
        return !(idx < 0 || idx >= n);
    };

    // M. 방문했는지 확인하는 함수
    let check = new Array(n).fill(false);

    // M. 재귀 함수
    const dfs = (idx) => {
        // I. 방문한 곳이면 return
        if (check[idx]) {
            return;
        }

        check[idx] = true;
        // I. 점핑(오른쪽, 왼쪽)
        if (arrangeIdx(idx + arr[idx])) dfs(idx + arr[idx]);
        if (arrangeIdx(idx - arr[idx])) dfs(idx - arr[idx]);
    };
    dfs(s-1);

    // console.log(check);
    // I. 방문한 곳만 출력
    return check.reduce((acc, value) => {
        if (value) return acc + 1;
        else return acc;
    }, 0);
}

console.log(solution(n, arr, s));
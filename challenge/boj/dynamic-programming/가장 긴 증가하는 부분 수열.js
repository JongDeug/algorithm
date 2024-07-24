import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 가장 긴 증가하는 부분 수열을 구하고 그 길이를 출력해라.

// 입력: N(수열 크기), arr(수열 값)
// 출력: int(부분 수열 중 가장 긴 값)

// 핵심
// 1. 수열이므로 순서를 움직일 수 없음.
// 2. 완탐, 백트래킹을 생각해봤는데 시간 복잡도에서 조건을 만족하지 못함.
// 3. DP로 풀어야함

// [문제 세분화]
let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);

function solution(n, arr) {
    // I. 메모지에이션(길이를 넣을거임)
    let memo = new Array(n).fill(1);

    // I. 이중 반복문 (n-1)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // I. 조건 1. 이전 값보다 커야함
            if (arr[j] > arr[i]) {
                memo[j] = Math.max(memo[i] + 1, memo[j]);
            }
        }
    }

    // console.log(memo);
    return Math.max(...memo);
}

console.log(solution(n, arr));
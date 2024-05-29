import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 상담하는 백준이가 최대한 많은 수익을 얻을 수 있는 방법을 구하는 함수를 구현해라.

// 입력: N(며칠 일하는지), arr[ [총 상담, 금액], ... ]
// 출력: int(최대한 많은 수익)

// 조건
// 1. N+1 이 퇴사일, 퇴사일에는 회사에 없어서 상담 못함.
// 2. 상담을 동시에 못함. => 동기적임

// 핵심
// 1. brute force 로 다 돌기
// 2. dynamic programming 사용하기

// [문제 세분화]
let n = Number(input[0]);
let arr = input.slice(1).map(x => x.split(" ").map(Number));

function solution(n, arr) {
    let ans = [];
    // M. 헬퍼 함수 구현
    const helper = (depth, sum, prevPrice) => {
        // I. Base Case : depth 가 n을 넘지 않아야 함.
        if (depth >= n) {
            if (depth === n) ans.push(sum);
            else ans.push(sum - prevPrice);
            return;
        }

        // I. 기본 로직 => for 문으로 바꾸면 can control ??
        for (let i = depth; i < n; i++) {
            let [t, p] = arr[i];
            helper(i + t, sum + p, p);
        }
    };
    helper(0, 0, 0);

    return Math.max(...ans);
}

console.log(solution(n, arr));
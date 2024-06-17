import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// N과 d진법이 주어졌을 때 N보다 크고 d진법 숫자가 모두 정확히 한 번씩 등장하는 가장 작은 수를 구해라.

// 입력: N(10진법으로 주어진 숫자), d(진법)
// 출력: int(N보다 크고 d진법 숫자가 모두 정확히 한 번씩 등장하는 가장 작은 수)

// 조건
// 1. 앞에 불필요한 0이 존재하면 안된다.

// 핵심
// 1. 10진법을 5진법으로 변환하는 함수 작성
// 2. 중복 없는 순열을 구하는 것이 핵심 => 9 * 8 * 7 * 6 .... 이므로 시간복잡도에서 문제 없을 것으로 보임

// [구체적인 예시]
// N(2021) d(5) => 2022 (31042)

// [문제 세분화]
let [n, d] = input.split(" ").map(Number);

function solution(n, d) {
    const input = Array.from({ length: d }, (v, i) => i);
    const check = new Array(d).fill(false);
    let ans = [];

    // M. d-1 까지의 중복없는 순열을 구하는 함수(앞에 0은제외)
    const permutation = (tmp) => {
        if (tmp.length === d) {
            // I. 앞에 0이 오는 놈은 제외
            if (tmp[0] !== 0) {
                const decimal_10 = parseInt([...tmp].join(""), d);
                if (decimal_10 > n) ans.push(decimal_10);
            }
            return;
        }

        for (let i = 0; i < d; i++) {
            if (!check[i]) {
                check[i] = true;
                tmp.push(input[i]);
                permutation(tmp);
                check[i] = false;
                tmp.pop();
            }
        }
    };

    permutation([]);
    return ans.length ? Math.min(...ans) : -1;
}

console.log(solution(n, d));
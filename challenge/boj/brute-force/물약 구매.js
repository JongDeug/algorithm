import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 준겸이가 물약을 구매하는데 가장 싸게 구매했을 때의 동전 가격을 반환하는 함수를 구현해라.

// 입력: N(물약 개수), arrC(물약 가격), arrS(1,2,3,4 .. 순서대로 1번 물약을 샀을 때 할인 항목)
// 출력: int(동전 가격)

// 핵심
// 2 <= N <= 10이므로 중복없는 순열로 구해야됨.
// 구한 순열로 할인 해서 나오는 동전을 모두 넣음 => 그중 가장 작은 값 출력

// [문제 세분화]
let n = Number(input[0]);
let arrC = input[1].split(" ").map(Number);
let arrS = Array.from({ length: n }, v => []);
let idx = -1;
input.slice(2).map(x => {
    const y = x.split(" ").map(Number);
    if (y.length === 1) {
        idx++;
    } else if (y.length === 2) {
        arrS[idx].push(y);
    }
});

function solution(n, arrC, arrS) {
    let check = new Array(n).fill(false);
    let ans = [];
    // M. 중복 없는 순열을 구하는 함수
    const permutation = (tmp) => {
        if (tmp.length === n) {
            // I. arrC 카피본
            const yak = [...arrC];
            let sum = 0;
            // I. 구한 tmp를 가지고 순서대로 로직 구현
            [...tmp].forEach(v => {
                // I. v는 살 물약
                // I. v를 샀을 때 할인 정보
                // I. 그에 맞춰 arrC를 변경
                sum += yak[v];
                for (const item of arrS[v]) {
                    const itemIdx = item[0] - 1;
                    const itemSale = item[1];
                    const calculate = yak[itemIdx] - itemSale;
                    yak[itemIdx] = calculate <= 0 ? 1 : calculate;
                }
            });
            ans.push(sum);
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!check[i]) {
                check[i] = true;
                tmp.push(i);
                permutation(tmp);
                check[i] = false;
                tmp.pop();
            }
        }
    };

    permutation([]);
    return Math.min(...ans)
}

console.log(solution(n, arrC, arrS));
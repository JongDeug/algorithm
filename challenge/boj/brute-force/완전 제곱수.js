import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 범위에서 완전 제곱수들의 합과 최솟값을 찾는 함수를 구현해라.

// 입력: n ~ m 범위 10,000
// 출력: sum, min, 없으면 -1

// 핵심
// 2초라 시간 복잡도는 딱히 생각하지 않아도 됨.

// [문제 세분화]
let n = Number(input[0]);
let m = Number(input[1]);

function solution(n, m) {
    let powArr = [];
    // I. 1 ~ 100 까지의 완전 제곱수를 구함
    for (let i = 1; i <= 100; i++) {
        powArr.push(Math.pow(i, 2));
    }
    // I. filter 함수로 해당 범위에 있는 완전 제곱수를 구함
    powArr = powArr.filter(x => x >= n && x <= m);
    // I. 만약 존재하면 합과 최솟값을 구해서 출력함.
    if (powArr.length) {
        let sum = powArr.reduce((acc, value) => acc + value, 0);
        let min = Math.min(...powArr);
        return `${sum}\n${min}`
    }
    // I. 만약 length가 0이면 -1 출력
    else return -1;
}

console.log(solution(n, m));
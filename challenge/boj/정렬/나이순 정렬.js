import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 회원들을 나이순으로 정렬하라. 나이가 같으면 주어진 순서대로 정렬하는 함수를 구현해라. (stable sort)

// 입력: N(int), arr([int, string])
// 출력: 정렬된 arr

// 핵심
// 1. javascript sort는 stable sort로 알고 있음.

// [문제 세분화]
let n = input[0];
let arr = input.slice(1).map(x => x.split(" ").map((v, i) => i === 0 ? Number(v) : v));

function solution(n, arr) {
    let answer = "";
    // I. 나이순으로 정렬, 오름차순
    arr.sort((a, b) => a[0] - b[0]);

    for (const item of arr) {
        answer += `${item[0]} ${item[1]}\n`;
    }

    return answer;
}

console.log(solution(n, arr));

// https://www.acmicpc.net/problem/2741

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input);

function solution(n) {
    let answer = "";
    for (let i = 1; i <= n; i++) {
        answer += i + '\n';
    }
    return answer;
}

console.log(solution(n));
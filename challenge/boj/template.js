import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");

// 입력값 한 개(한 줄)
// const input = fs.readFileSync(filePath).toString().trim();

// 입력값 여러 개(한 줄에 공백으로 구분)
// const input = fs.readFileSync(filePath).toString().trim().split(" ");

// 입력값 여러 줄
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 입력값 첫 번째 줄 길이(n), 두 번째 줄에 공백으로 구분되는 입력값이 주어질 때
// const [n, input] = fs.readFileSync(filePath).toString().trim().split("\n");
// const inputArr = input.trim().split(" ");

// 입력값 첫 번째 줄 길이(n), n개의 줄 마다 하나의 입력값이 주어질 때
// const [n, input] = fs.readFileSync(filePath).toString().trim().split("\n");
// console.log(n, input);

function solution(arr) {
    return arr;
}

console.log(solution(input));

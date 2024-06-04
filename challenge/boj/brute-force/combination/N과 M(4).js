import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// 중복 있는 조합

// 입력: N중 M
// 출력: 중복 조합

// [문제 세분화]
let [n, m] = input.split(" ").map(Number);

function solution(n, m) {
    let num = Array.from({ length: n }, (v, i) => i + 1);
    let ans = [];
    let answer = [];

    // I. For 문 없이 해봤음
    const combination = (depth, tmp) => {
        if (depth === n) return;
        if (tmp.length === m) {
            ans.push([...tmp]);
            return;
        }

        tmp.push(num[depth]);
        combination(depth, tmp);
        tmp.pop();

        combination(depth + 1, tmp);
    };

    combination(0, []);
    ans.forEach(value => answer += `${value.join(" ")}\n`);
    return answer;
}

console.log(solution(n, m));
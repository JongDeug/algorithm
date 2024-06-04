import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// 중복 없는 조합 구하기

// 입력: N중 M
// 출력: 중복 없는 조합

// 조건 :
// 중복되는 수열을 여러 번 출력하면 => 조합

// [문제 세분화]
let [n, m] = input.split(" ").map(Number);

function solution(n, m) {
    let num = Array.from({ length: n }, (v, i) => i + 1);
    let ans = [];

    const combination = (depth, tmp) => {
        if (tmp.length === m) {
            ans.push([...tmp]);
            return;
        }

        for (let i = depth; i < n; i++) {
            tmp.push(num[i]);
            combination(i + 1, tmp);
            tmp.pop();
        }
    };

    combination(0, []);
    ans.forEach(value => console.log(value.join(' ')))
}

solution(n, m);
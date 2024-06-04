import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// 중복 순열

// 입력: N중 M
// 출력: 중복 순열

// [문제 세분화]
let [n, m] = input.split(" ").map(Number);

function solution(n, m) {
    let num = Array.from({ length: n }, (v, i) => i + 1);
    let ans = [];
    let answer = "";

    const permutation = (tmp) => {
        if (tmp.length === m) {
            ans.push([...tmp]);
            return;
        }

        for (let i = 0; i < n; i++) {
            tmp.push(num[i]);
            permutation(tmp);
            tmp.pop();
        }
    };

    permutation([]);
    ans.forEach(value => answer += `${value.join(" ")}\n`);
    return answer;
}

console.log(solution(n, m));
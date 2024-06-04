import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 중복 있는 순열, but 숫자는 주어진 것을 사용해야 함.

// 입력: N중 M, arr of integer(N)
// 출력: 중복 있는 순열

// [문제 세분화]
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number).sort((a, b) => a - b);

function solution(n, m, arr) {
    let ans = [];
    let answer = "";

    const permutation = (tmp) => {
        if (tmp.length === m) {
            ans.push([...tmp]);
            return;
        }
        for (let i = 0; i < n; i++) {
            tmp.push(arr[i]);
            permutation(tmp);
            tmp.pop();
        }
    };

    permutation([]);
    ans.forEach(value => answer += `${value.join(" ")}\n`);
    return answer;
}

console.log(solution(n, m, arr));